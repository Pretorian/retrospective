class AddIdentityToTeams < ActiveRecord::Migration
  def change
    add_column :teams, :identity, :string, limit: 36
    add_index :teams, :identity
  end
end
