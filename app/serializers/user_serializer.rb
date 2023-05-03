class UserSerializer < ActiveModel::Serializer
  attributes :username, :home

  has_one :user_image
  has_many :visits

  def home
    # binding.pry
    [self.object.longitude, self.object.latitude]
  end
  
end
