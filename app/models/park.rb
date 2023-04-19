class Park < ApplicationRecord
    has_many :park_images
    has_many :comments

    default_scope {order(:name => :asc)}
end
