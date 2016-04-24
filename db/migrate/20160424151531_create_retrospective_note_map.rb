class CreateRetrospectiveNoteMap < ActiveRecord::Migration
  def up
    execute "CREATE TABLE `retrospective_note_map` (
      `id` int(11) NOT NULL AUTO_INCREMENT,
      `retrospective_id` int(11) unsigned NOT NULL DEFAULT '0',
      `note_id` int(11) unsigned NOT NULL DEFAULT '0',
      PRIMARY KEY (`id`)
    )"
  end
end
