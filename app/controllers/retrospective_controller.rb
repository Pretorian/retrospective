class RetrospectiveController < ApplicationController
  before_action :authenticate_user!

  def init
    @retrospective_service = RetrospectiveServiceFactory.create
  end

  def index

  end

  def list
    params = self.request_data()
    render :json => @retrospective_service
      .display_retrospectives_for_user(current_user.identity, params['count'])
      .to_json
  end
end
