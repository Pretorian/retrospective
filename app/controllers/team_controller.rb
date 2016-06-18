class TeamController < ApplicationController
  before_action :authenticate_user!

  def init
    @team_service = TeamServiceFactory.create
  end

  def index
    @teams = @team_service.display_teams_for_user(current_user.identity)
  end

  def users
    request = self.request_data
    render json: @team_service.display_users_for_team(request['teamIdentity'])
  end
end
