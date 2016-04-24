class Retrospective::NoteRating < ActiveRecord::Base
  self.table_name = 'retrospective_note_rating'

  has_many :notes, through: :note_rating_maps, class_name: 'Retrospective::Note'
  has_many :note_rating_maps, class_name: 'Retrospective::NoteRatingMap'

  def initialize(user_identity)
    super({
      user_identity: user_identity
    })
  end

  def provide_note_rating_interest
    {
      id: self.id,
      userId: self.user_identity
    }
  end
end

