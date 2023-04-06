class UserSerializer < ActiveModel::Serializer
  attributes :username

  has_one :user_image
  
end
