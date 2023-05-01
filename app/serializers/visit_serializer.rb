class VisitSerializer < ActiveModel::Serializer
  attributes :id, :start_time, :duration
  has_one :user
  has_one :park
end
