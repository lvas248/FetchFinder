class Visit < ApplicationRecord
  before_create :set_end_time
  before_update :update_end_time

  belongs_to :user
  belongs_to :park

  default_scope {order(:start_time => :desc)}

  private

  def set_end_time
    self.end_time = self.start_time + self.duration.to_i
  end

  def update_end_time
    # binding.pry
    if(duration_changed? || start_time_changed? )
      self.end_time = self.start_time + self.duration.to_i
    end
    # binding.pry
  end
  
end
