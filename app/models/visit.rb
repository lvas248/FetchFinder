class Visit < ApplicationRecord

  before_create :set_end_time
  before_update :update_end_time

  validate :future_date
  validates :duration, numericality: { greater_than: 0}
  validate :time_conflict?


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

  def future_date
    unless self.start_time > DateTime.now
      errors.add(:start_time, 'Must pick a future date and time')
    end
  end

  def time_conflict?
      conflict = self.user.visits.where('(start_time <= ? AND end_time >= ?) OR (start_time <= ? AND end_time >= ?)', self.start_time, self.start_time, self.start_time + self.duration, self.start_time + self.duration)
      unless conflict.empty?
        errors.add(:conflict, 'Conflicting visit. Please select a different timeframe.')
      end
  end

  # Search through user.visits to see if new visit.start_time 
  
end
