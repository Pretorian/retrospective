class Retrospective::Note < ActiveRecord::Base
  self.table_name = 'retrospective_note'

  has_many :retrospectives, through: :note_maps, class_name: 'Retrospective::Retrospective'
  has_many :note_maps, class_name: 'Retrospective::NoteMap'

  has_many :note_ratings, through: :note_rating_maps, class_name: 'Retrospective::NoteRating'
  has_many :note_rating_maps, class_name: 'Retrospective::NoteRatingMap'

  def provide_note_ratings_interest
    self.note_ratings.map do |note_rating|
      note_rating.provide_note_rating_interest
    end
  end

  def provide_note_interest
    {
      identity: self.identity,
      content: self.content,
      designation: self.designation,
      createdAt: self.created_at,
      userId: self.user_identity,
      noteRating: self.note_ratings.length,
      noteRatings: self.provide_note_ratings_interest,
    }
  end
end
