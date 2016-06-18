class TeamServiceFactory
  def self.create
    TeamService.new(
      Team::TeamRepository.new,
      User::UserRepository.new
    )
  end
end
