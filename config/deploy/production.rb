set :stage, :production

server ENV['RETROSPECTIVE_SERVER_IP'], user: 'deploy', roles: %w{web app db}
