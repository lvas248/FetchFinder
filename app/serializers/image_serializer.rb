class ImageSerializer < ActiveModel::Serializer
  attributes :id, :url, :public_id, :imageable_id
  has_one :imageable


end
