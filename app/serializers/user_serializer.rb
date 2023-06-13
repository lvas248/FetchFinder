class UserSerializer < ActiveModel::Serializer
  attributes :username, :id, :top_visited_parks

  has_one :image, as: :imageable
  has_many :visits

  def top_visited_parks
    groups = self.object.parks.group_by{|p| p.name}.sort_by{|_,g| g.count}.reverse
    updated_groups = groups.map{ |n,g| { name: n, qty: g.count} }
    updated_groups.slice(0,3)
  end
  
end
