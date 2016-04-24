class CreateUser < ActiveRecord::Migration
  def up
    execute "CREATE TABLE `user` (
      `id` int(11) NOT NULL AUTO_INCREMENT,
      `identity` varchar(255) DEFAULT NULL,
      `first_name` varchar(255) DEFAULT NULL,
      `last_name` varchar(255) DEFAULT NULL,
      `initials` varchar(255) DEFAULT NULL,
      `email` varchar(255) NOT NULL DEFAULT '',
      `encrypted_password` varchar(255) NOT NULL DEFAULT '',
      `reset_password_token` varchar(255) DEFAULT NULL,
      `reset_password_sent_at` datetime DEFAULT NULL,
      `remember_created_at` datetime DEFAULT NULL,
      `sign_in_count` int(11) NOT NULL DEFAULT '0',
      `current_sign_in_at` datetime DEFAULT NULL,
      `last_sign_in_at` datetime DEFAULT NULL,
      `current_sign_in_ip` varchar(255) DEFAULT NULL,
      `last_sign_in_ip` varchar(255) DEFAULT NULL,
      PRIMARY KEY (`id`),
      UNIQUE KEY `index_user_on_email` (`email`),
      UNIQUE KEY `index_user_on_reset_password_token` (`reset_password_token`)
    )"
  end
end
