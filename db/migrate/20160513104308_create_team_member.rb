class CreateTeamMember < ActiveRecord::Migration
  def change
    create_table :team_members do |t|
      t.integer 'team_id'
      t.string 'user_identity', limit: 36
    end
  end
end
