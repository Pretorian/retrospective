class RetrospectiveService
  def initialize(interest_processing_service, retrospective_repository, user_repository)
    @interest_processing_service = interest_processing_service
    @retrospective_repository = retrospective_repository
    @user_repository = user_repository
  end

  def display_retrospectives_for_user(user_identity, count)
    retrospectives = @retrospective_repository.many_for_user(user_identity, count)
    retrospectives.map do |retrospective|
      retrospective.provide_retrospective_interest
    end
  end

  def create_retrospective(user_identity, name)
    retrospective_creation_service = Retrospective::RetrospectiveCreationService.new(
      @retrospective_repository
    )

    # Let our domain service do the heavy lifting
    retrospective = retrospective_creation_service.create_retrospective(
      user_identity,
      name,
      DateTime.now
    )

    @retrospective_repository.flush()

    retrospective.provide_retrospective_interest
  end

  def create_note_for_retrospective(user_identity, slug, identity, content, designation)
    retrospective = @retrospective_repository.one_with_slug(slug)
    return if not retrospective

    note = retrospective.add_note(
      identity,
      content,
      designation,
      user_identity,
      DateTime.now
    )

    @retrospective_repository.persist(retrospective)

    note.provide_note_interest
  end

  def combine_notes_with_user_data(notes)
    user_identities = @interest_processing_service.extract_user_ids_from_notes(notes)
    users = @user_repository.many_with_identities(user_identities)
    found_users = @interest_processing_service.sort_users_by_identity(users)

    @interest_processing_service.map_notes_to_users(notes, found_users)
  end

  def display_retrospective_with_notes(slug)
    retrospective = @retrospective_repository.one_with_slug(slug)
    return if not retrospective

    retrospective = retrospective.provide_retrospective_interest
    retrospective[:notes] = self.combine_notes_with_user_data(retrospective[:notes])

    retrospective
  end

  def display_users_for_retrospective(slug)
    @user_repository.many_for_retrospective(slug).map do |user|
      user.provide_user_interest
    end
  end

  def add_note_rating(user_identity, slug, identity)
    retrospective = @retrospective_repository.one_with_slug(slug)
    retrospective.add_rating_for_note(identity, user_identity)

    @retrospective_repository.persist(retrospective)
  end

  def remove_note_from_retrospective(slug, identity)
    retrospective = @retrospective_repository.one_with_slug(slug)
    retrospective.remove_note(identity)

    @retrospective_repository.persist(retrospective)
  end
end
