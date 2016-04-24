class User::UserRepository
  def one_of_identity(identity)
    ::User.find_by(identity: identity)
  end

  def many_with_identities(identities)
    ::User.where(identity: identities)
  end

  def many_for_retrospective(slug)
    sql = "
      SELECT u.*
      FROM retrospective r
      JOIN retrospective_note_map nm ON nm.retrospective_id = r.id
      JOIN retrospective_note n ON nm.note_id=n.id
      LEFT JOIN retrospective_note_rating_map nrm ON nrm.note_id=n.id
      LEFT JOIN retrospective_note_rating nr ON nr.id=nrm.note_rating_id
      JOIN user u ON n.user_identity = u.identity OR nr.user_identity=u.identity
      WHERE r.slug = ?
      GROUP BY u.identity
      ORDER BY u.initials ASC
    "
    ::User.find_by_sql([sql, slug])
  end
end
