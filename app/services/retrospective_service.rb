class RetrospectiveService
  def initialize(retrospective_repository, user_repository)
    @retrospective_repository = retrospective_repository
    @user_repository = user_repository
  end

  def display_retrospectives_for_user(user_identity, count)
    retrospectives = @retrospective_repository.many_for_user(user_identity, count)
    retrospectives.map do |retrospective|
      retrospective.provide_retrospective_interest
    end
  end
end
