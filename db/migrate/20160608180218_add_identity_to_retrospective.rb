class AddIdentityToRetrospective < ActiveRecord::Migration
  def change
    add_column :retrospective, :identity, :string, limit: 36
  end
end
