class Retrospective::RetrospectiveRepository
  def initialize
    @retrospectives = []
  end

  def many_for_user(user_identity, count)
    Retrospective::Retrospective.limit(count).where(user_identity: user_identity)
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
end
