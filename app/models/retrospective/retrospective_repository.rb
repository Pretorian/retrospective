class Retrospective::RetrospectiveRepository
  def initialize
    @retrospectives = []
  end

  def many_for_team(team_identity)
    Retrospective::Retrospective
      .where(team_identity: team_identity)
      .order(created_at: :desc);
  end

  def one_with_slug(slug)
    Retrospective::Retrospective.find_by(slug: slug)
  end

  def one_with_identity(identity)
    Retrospective::Retrospective.find_by(identity: identity)
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
