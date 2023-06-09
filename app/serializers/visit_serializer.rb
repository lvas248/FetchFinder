require 'time'

class VisitSerializer < ActiveModel::Serializer
  attributes :id, :start_time, :start, :upcoming, :park, :formatted_duration
  
 
  def start
    # binding.pry
    formatted_date = self.object.start_time.in_time_zone("Eastern Time (US & Canada)")
    {
      date: formatted_date.strftime('%A %B %d, %Y'),
      time: formatted_date.strftime('%I:%M %p %Z')
    }
  end

  def formatted_duration
    # binding.pry
    seconds = self.object.duration
    hours, remainder = seconds.divmod(3600)
    minutes, = remainder.divmod(60)
    return { hours: hours, minutes: minutes}
  end

  def upcoming
    # binding.pry
    Time.now < self.object.end_time
  end




  
end
