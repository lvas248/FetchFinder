class UserSerializer < ActiveModel::Serializer
  attributes :username, :id

  has_one :image, as: :imageable
  has_many :visits
  has_many :visited_parks, through: :visits, source: :park, serializer: UserParkSerializer

 
 def visited_parks
  object.parks.uniq
 end
  

end
