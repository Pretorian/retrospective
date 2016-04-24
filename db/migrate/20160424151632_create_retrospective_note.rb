class CreateRetrospectiveNote < ActiveRecord::Migration
  def up
    execute "CREATE TABLE `retrospective_note` (
      `id` int(11) NOT NULL AUTO_INCREMENT,
      `user_identity` varchar(255) NOT NULL,
      `content` varchar(2056) DEFAULT NULL,
      `designation` int(11) NOT NULL,
      `created_at` datetime NOT NULL,
      `last_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
      `identity` varchar(255) DEFAULT NULL,
      PRIMARY KEY (`id`)
    )"
  end
end
