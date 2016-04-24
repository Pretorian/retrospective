class CreateRetrospectiveNoteRating < ActiveRecord::Migration
  def up
    execute "CREATE TABLE `retrospective_note_rating` (
      `id` int(11) NOT NULL AUTO_INCREMENT,
      `user_identity` varchar(255) NOT NULL,
      PRIMARY KEY (`id`)
    )"
  end
end
