class InterestProcessingService
  def extract_user_ids_from_notes(notes)
    user_ids = []
    notes.each do |note|
      user_ids.push(note[:userId])
      note[:noteRatings].each do |rating|
        user_ids.push(rating[:userId])
      end
    end

    return user_ids
  end

  def sort_users_by_identity(users)
    found_users = Hash.new

    users.each do |user|
      interest = user.provide_user_interest
      found_users[interest[:identity]] = interest
    end

    found_users
  end

  def map_notes_to_users(notes, users)
    $foundNotes = [];
    found_notes = []
    notes.map do |note|
      note_user_id = note[:userId]
      note[:user] = users[note_user_id]
      note[:noteRatings] = note[:noteRatings].map do |rating|
        rating[:user] = users[rating[:userId]]
        rating
      end

      note
    end
  end
end
