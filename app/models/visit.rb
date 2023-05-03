class Visit < ApplicationRecord
  belongs_to :user
  belongs_to :park

  default_scope {order(:start_time => :asc)}

end
