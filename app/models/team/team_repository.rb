class Team::TeamRepository
  def initialize
    @teams = []
  end

  def one_of_identity(identity)
    Team::Team.find_by(identity: identity)
  end

  def many_for_user(user_identity)
    Team::Team
      .joins(:team_members)
      .where(team_members: {user_identity: user_identity})
      .order(name: :asc)
  end

  def add(team)
    @teams.push(retrospective)
  end

  def flush
    @teams.each do |retrospective|
      retrospective.save
    end

    @teams = []
  end

  def persist(team)
    team.save
  end
end
