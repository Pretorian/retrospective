class TeamService
  def initialize(team_repository, user_repository)
    @team_repository = team_repository
    @user_repository = user_repository
  end

  def display_teams_for_user(user_identity)
    @team_repository.many_for_user(user_identity).map do | team |
      team.provide_team_interest
    end
  end

  def display_users_for_team(team_identity)
    team = @team_repository.one_of_identity(team_identity)
    user_identities = team.member_identities

    @user_repository.many_with_identities(user_identities).map do | user |
      user.provide_user_interest
    end
  end
end
