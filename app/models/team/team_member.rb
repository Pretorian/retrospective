class Team::TeamMember < ActiveRecord::Base
  def provide_team_member_interest
    {
      id: self.id,
      user_identity: self.user_identity
    }
  end
end
