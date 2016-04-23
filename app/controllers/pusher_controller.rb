require 'pusher'

class PusherController < ApplicationController
	def init

  end

  def auth
		# @TODO I don't like that we're leaking configuration into our controller
		# Figure this out later
		config = Rails.configuration.x.pusher

		Pusher.app_id = config[:appId]
		Pusher.key = config[:appKey]
		Pusher.secret = config[:appSecret]
		response = Pusher.authenticate(params[:channel_name], params[:socket_id], {
			user_id: 'user_id',
			user_info: {}
		})

		render :json => response.to_json
  end
end
