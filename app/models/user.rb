class User < ActiveRecord::Base
  self.table_name = 'user'

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable,
         :registerable,
         :recoverable,
         :rememberable,
         :trackable,
         :validatable

  def initialize(params)
    params[:identity] = SecureRandom.uuid
    if params[:first_name]
      params[:initials] = "#{params[:first_name].first}#{params[:last_name].first}"
    end
    super(params)
  end

  def provide_user_interest
    {
      id: self.id,
      identity: self.identity,
      firstName: self.first_name,
      lastName: self.last_name,
      initials: self.initials
    }
  end
end
