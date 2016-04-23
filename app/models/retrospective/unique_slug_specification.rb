class Retrospective::UniqueSlugSpecification

  def initialize(retrospective_repository)
    @retrospective_repository = retrospective_repository
  end

  def is_satisfied_by(retrospective)
    !@retrospective_repository.one_with_slug(retrospective.slug)
  end
end
