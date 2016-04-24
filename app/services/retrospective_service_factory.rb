class RetrospectiveServiceFactory
  def self.create
    RetrospectiveService.new(
      InterestProcessingService.new,
      Retrospective::RetrospectiveRepository.new,
      User::UserRepository.new
    )
  end
end
