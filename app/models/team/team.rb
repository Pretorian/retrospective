class Team::Team < ActiveRecord::Base
  has_many :team_members

  def provide_team_interest
    {
      id: self.id,
      name: self.name,
      members: self.team_members.map { |member| member.provide_team_member_interest }
    }
  end
end
