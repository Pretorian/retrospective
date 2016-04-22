module ApplicationHelper
  def pusher_credentials
    config = Rails.configuration.x.pusher
    {
      appKey: config[:appKey],
      channel: config[:channel]
    }.to_json
  end

  def user_info
    nil if not current_user else current_user.provide_user_interest.to_json
  end
end
