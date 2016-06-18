class Team::TeamMember < ActiveRecord::Base
  def provide_team_member_interest
    {
      user_identity: self.user_identity
    }
  end

  def get_user_identity
    self.user_identity
  end
end
