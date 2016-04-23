class Retrospective::Retrospective < ActiveRecord::Base
  self.table_name = 'retrospective'

  has_many :notes, through: :note_maps, class_name: 'Retrospective::Note'
  has_many :note_maps, class_name: 'Retrospective::NoteMap'

  def initialize(user_identity, name, created_at)
    super({
      user_identity: user_identity,
      name: name,
      created_at: created_at
    })
  end

  def set_slug(slug)
    self.slug = slug
  end

  def provide_notes_interest
    self.notes.map do |note|
      note.provide_note_interest
    end
  end

  def provide_retrospective_interest
    {
      id: self.id,
      name: self.name,
      slug: self.slug,
      createdAt: self.created_at,
      userId: self.user_identity,
      notes: self.provide_notes_interest
    }
  end
end


