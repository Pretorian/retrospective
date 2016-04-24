class Retrospective::RetrospectiveCreationService
  def initialize(retrospective_repository)
    @retrospective_repository = retrospective_repository
  end

  def url_title(text)
    text.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
  end

  def create_retrospective(user_identity, name, created_at)
    retrospective = Retrospective::Retrospective.new(user_identity, name, created_at)

    ext = ''

    # Here, we're going to look for an adequate url title for a retrospective. So,
    # for a retrospective named "Greedo", we'll try greedo, greedo-1, greedo-{n}
    while true
      retrospective.set_slug(self.url_title("#{name} #{ext}"))
      if self.check_slug_is_unique(retrospective)
        break
      end

      ext = ext.to_i + 1
    end

    @retrospective_repository.add(retrospective)

    retrospective
  end

  def check_slug_is_unique(retrospective)
    specification = Retrospective::UniqueSlugSpecification.new(@retrospective_repository)

    return specification.is_satisfied_by(retrospective)
  end
end
