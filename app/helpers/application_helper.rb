module ApplicationHelper
  def pusher_credentials
    config = Rails.configuration.x.pusher
    {
      appKey: config[:appKey],
      channel: config[:channel]
    }.to_json
  end
end
