class Comment < ApplicationRecord

  validates :comment, { presence: true }

  belongs_to :user
  belongs_to :park

  default_scope {order(:created_at => :desc)}

end
