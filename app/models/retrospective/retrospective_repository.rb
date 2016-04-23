class Retrospective::RetrospectiveRepository
  def many_for_user(user_identity, count)
    Retrospective::Retrospective.limit(count).where(user_identity: user_identity)
  end
end
