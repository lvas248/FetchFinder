class UserSerializer < ActiveModel::Serializer
  attributes :username, :home

  has_one :user_image

  def home
    # binding.pry
    [self.object.longitude, self.object.latitude]
  end
  
end
