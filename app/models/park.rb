class Park < ApplicationRecord
    has_many :park_images
    has_many :comments
    has_many :visits

    default_scope {order(:name => :asc)}
end
