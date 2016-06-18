class Team::Team < ActiveRecord::Base
  has_many :team_members

  def provide_team_interest
    {
      identity: self.identity,
      name: self.name,
      members: self.team_members.map { |member| member.provide_team_member_interest }
    }
  end

  def member_identities
    return self.team_members.map { |member| member.get_user_identity() }
  end
end
