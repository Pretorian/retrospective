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

  def add_note(identity, content, designation, user_identity, created_at)
    note = Retrospective::Note.new(
      identity,
      content,
      designation,
      user_identity,
      created_at
    )

    self.notes.push(note)

    note
  end

  def provide_notes_interest
    self.notes.map do |note|
      note.provide_note_interest
    end
  end

  def provide_retrospective_interest
    {
      created_at: self.created_at,
      identity: self.identity,
      name: self.name,
      notes: self.provide_notes_interest,
      slug: self.slug,
      team_identity: self.team_identity,
      user_id: self.user_identity
    }
  end

  def add_rating_for_note(note_identity, user_identity)
    note = self.notes.find { |note| note.identity === note_identity }
    note.add_rating(user_identity)
  end

  def remove_note(note_identity)
    note = self.notes.find { |note| note.identity === note_identity }
    self.notes.destroy(note)
  end
end


