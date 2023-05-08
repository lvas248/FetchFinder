class Visit < ApplicationRecord
  before_create :set_end_time

  belongs_to :user
  belongs_to :park

  default_scope {order(:start_time => :desc)}

  private

  def set_end_time
    self.end_time = self.start_time + self.duration.to_i
  end
  
end
