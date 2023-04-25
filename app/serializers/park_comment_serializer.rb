require 'pry'

class ParkCommentSerializer < ActiveModel::Serializer
  attributes :id, :comments, :user

end
