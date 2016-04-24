class RetrospectiveController < ApplicationController
  before_action :authenticate_user!

  def init
    @retrospective_service = RetrospectiveServiceFactory.create
  end

  def index

  end

  def list
    request = self.request_data()
    render :json => @retrospective_service
      .display_retrospectives_for_user(current_user.identity, request['count'])
  end

  def create
    request = self.request_data()
    render :json => @retrospective_service
      .create_retrospective(current_user.identity, request['name'])
  end

  def save_note
    request = self.request_data()['data']
    render :json => @retrospective_service
      .create_note_for_retrospective(
        current_user.identity,
        request['retrospectiveSlug'],
        request['identity'],
        request['content'],
        request['designation']
      )
  end

  def load_retrospective
    @retrospective = @retrospective_service
      .display_retrospective_with_notes(params[:slug])

    render 'index'
  end

  def load_users
    request = self.request_data()
    render :json => @retrospective_service
      .display_users_for_retrospective(request['slug'])
  end

  def increment_note_count
    request = self.request_data()
    @retrospective_service.add_note_rating(
      current_user.identity,
      request['slug'],
      request['identity']
    )

    render :json => {status: '√'}
  end

  def remove_note
    request = self.request_data()
    @retrospective_service.remove_note_from_retrospective(request['slug'], request['identity'])

    render :json => {status: '√'}
  end
end
