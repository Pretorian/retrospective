class Retrospective::RetrospectiveRepository
  def initialize
    @retrospectives = []
  end

  # @TODO Refactor this to use ActiveRecord
  def many_for_user(user_identity, count)
    sql = "
      SELECT r.* from retrospective r
      LEFT JOIN retrospective_note_map rnm ON rnm.retrospective_id=r.id
      LEFT JOIN retrospective_note rn ON rn.id=rnm.note_id AND rn.user_identity= ?
      WHERE (r.user_identity = ?  OR rn.user_identity IS NOT NULL)
      GROUP BY r.id
      ORDER BY created_at DESC
      LIMIT ?
    "

    Retrospective::Retrospective.find_by_sql([sql, user_identity, user_identity, count])
  end

  def one_with_slug(slug)
    Retrospective::Retrospective.find_by(slug: slug)
  end

  def add(retrospective)
    @retrospectives.push(retrospective)
  end

  def flush
    @retrospectives.each do |retrospective|
      retrospective.save
    end

    @retrospectives = []
  end

  def persist(retrospective)
    retrospective.save
  end
end
