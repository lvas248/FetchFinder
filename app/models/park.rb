class Park < ApplicationRecord
    
    has_many :comments
    has_many :visits
    has_many :images, as: :imageable
    has_many :users, through: :visits

    default_scope {order(:name => :asc)}
end
