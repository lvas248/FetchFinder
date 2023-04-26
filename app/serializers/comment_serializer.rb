require 'pry'

class CommentSerializer < ActiveModel::Serializer
  attributes :id, :comment, :filtered_user, :date, :park

  
  def filtered_user
    { username: self.object.user.username, user_image: self.object.user.user_image }
  end

  def date
    # binding.pry
    eastern_time = self.object.created_at.in_time_zone("Eastern Time (US & Canada)")
    eastern_time.strftime("%B %d, %Y %l:%M%P %Z")
  end



end
