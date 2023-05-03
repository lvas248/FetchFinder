require 'time'

class VisitSerializer < ActiveModel::Serializer
  attributes :id, :start, :end, :user, :park, :upcoming
 
  def start
    # binding.pry
    formatted_date = self.object.start_time.in_time_zone("Eastern Time (US & Canada)")
    {
      date: formatted_date.strftime('%A %B %d, %Y'),
      time: formatted_date.strftime('%I:%M %p %Z')
    }
  end

  def end
    formatted_date = self.object.end_time.in_time_zone("Eastern Time (US & Canada)")
    {
      date: formatted_date.strftime('%B %d, %Y'),
      time: formatted_date.strftime('%I:%M %p %Z')
    }
  end

  def upcoming
    Time.now < self.object.start_time
  end
  
end
