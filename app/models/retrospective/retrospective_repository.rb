class Retrospective::RetrospectiveRepository
  def initialize
    @retrospectives = []
  end

  def many_for_user(user_identity, count)
    Retrospective::Retrospective
      .where(user_identity: user_identity)
      .order(created_at: :desc)
      .limit(count)
  end

  def one_with_slug(slug)
    Retrospective::Retrospective.find_by(slug: slug)
  end

  def add(retrospective)
    @retrospectives.push(retrospective)
  end

  def flush
    @retrospectives.each do |retrospective|
      retrospective.save
    end

    @retrospectives = []
  end

  def persist(retrospective)
    retrospective.save
  end
end
