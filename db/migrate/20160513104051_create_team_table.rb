class CreateTeamTable < ActiveRecord::Migration
  def change
    create_table :teams do |t|
      t.string 'name', limit: 512
      t.string 'account_identity', limit: 36
    end
  end
end
