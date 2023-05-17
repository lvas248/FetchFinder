class ParkSerializer < ActiveModel::Serializer
  attributes :id, :name, :borough, :zip, :surface, :seating, :lat, :long, :address, :users_at_park_now
  
  # has_many :park_images
  has_many :comments
  has_many :images, as: :imageable

  def users_at_park_now
    self.object.visits.where('start_time < ?', DateTime.now).where('end_time > ?', DateTime.now).count
  end 

end
 