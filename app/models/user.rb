
class User < ApplicationRecord
    
    has_secure_password

    has_one :image, as: :imageable, dependent: :destroy
    has_many :comments, dependent: :destroy
    has_many :visits, dependent: :destroy
    has_many :images, as: :imageable, dependent: :destroy

    validates :username, { presence: true, uniqueness: true }
    
    def upload_and_replace_user_image(new_image)
        # binding.pry
        
        self.destroy_cloudinary_image
          

        result =  Cloudinary::Uploader.upload(new_image.tempfile.path, :transformation => 
            {:width => 400, :height => 400, :crop=> :lfill})
        
        self.create_image!(
            url: result['url'],
            public_id: result['public_id']
        )

    end

    def destroy_cloudinary_image
        # binding.pry
        if self.image
            result = Cloudinary::Uploader.destroy(self.image.public_id)
            self.image.destroy
        end
    end


end
