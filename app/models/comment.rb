class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :park

  default_scope {order(:created_at => :desc)}

end
