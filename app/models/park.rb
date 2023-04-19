class Park < ApplicationRecord
    has_many :park_images

    default_scope {order(:name => :asc)}
end
