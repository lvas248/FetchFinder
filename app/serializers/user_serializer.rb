class UserSerializer < ActiveModel::Serializer
  attributes :username, :id

  has_one :image, as: :imageable
  has_many :visits


  
end
