class Retrospective::NoteMap < ActiveRecord::Base
  self.table_name = 'retrospective_note_map'

  belongs_to :retrospective, class_name: 'Retrospective::Retrospective'
  belongs_to :note, class_name: 'Retrospective::Note'
end
