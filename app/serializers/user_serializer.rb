class UserSerializer < ActiveModel::Serializer
  attributes :username

  has_one :image, as: :imageable
  has_many :visits


  
end
