class RetrospectiveServiceFactory
  def self.create
    RetrospectiveService.new(
      Retrospective::RetrospectiveRepository.new,
      User::UserRepository.new
    )
  end
end
