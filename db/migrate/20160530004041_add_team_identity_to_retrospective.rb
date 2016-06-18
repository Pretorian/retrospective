class AddTeamIdentityToRetrospective < ActiveRecord::Migration
  def change
    add_column :retrospective, :team_identity, :string, limit: 36
  end
end
