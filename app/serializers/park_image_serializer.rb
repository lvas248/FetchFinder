class ParkImageSerializer < ActiveModel::Serializer
  attributes :id, :url, :public_id
  has_one :park
end
