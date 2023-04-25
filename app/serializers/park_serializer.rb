class ParkSerializer < ActiveModel::Serializer
  attributes :id, :name, :borough, :zip, :surface, :seating, :lat, :long, :address
  
  has_many :park_images
  has_many :comments

end
