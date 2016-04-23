class Retrospective::NoteRatingMap < ActiveRecord::Base
  self.table_name = 'retrospective_note_rating_map'

  belongs_to :note, class_name: 'Retrospective::Note'
  belongs_to :note_rating, class_name: 'Retrospective::NoteRating'
end
