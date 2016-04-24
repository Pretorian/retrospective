require File.expand_path('../boot', __FILE__)

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Retrospective
  class Application < Rails::Application
    config.assets.enabled = false

    # Do not swallow errors in after_commit/after_rollback callbacks.
    config.active_record.raise_in_transactional_callbacks = true

    config.x.pusher = {
      channel: ENV['PUSHER_CHANNEL'],
      appId: ENV['PUSHER_APP_ID'],
      appKey: ENV['PUSHER_APP_KEY'],
      appSecret: ENV['PUSHER_APP_SECRET']
    }
  end
end
