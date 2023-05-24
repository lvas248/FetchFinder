class Image < ApplicationRecord
  belongs_to :imageable, polymorphic: true

  validate :image_added?

  def image_added?
      
  end
end
