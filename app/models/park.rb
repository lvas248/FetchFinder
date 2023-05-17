class Park < ApplicationRecord
    # has_many :park_images
    has_many :comments
    has_many :visits
    has_many :images, as: :imageable

    default_scope {order(:name => :asc)}
end
