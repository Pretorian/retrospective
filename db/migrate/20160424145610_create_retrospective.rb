class CreateRetrospective < ActiveRecord::Migration
  def up
    execute "CREATE TABLE `retrospective` (
      `id` int(11) NOT NULL AUTO_INCREMENT,
      `user_identity` varchar(255) NOT NULL,
      `name` varchar(512) DEFAULT NULL,
      `slug` varchar(255) NOT NULL,
      `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (`id`)
    )"
  end
end
