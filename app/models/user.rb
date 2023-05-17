
class User < ApplicationRecord
    
    has_secure_password

    has_one :user_image, dependent: :destroy
    has_many :comments, dependent: :destroy
    has_many :visits, dependent: :destroy

    validates :username, { presence: true, uniqueness: true }
    
    def upload_and_replace_user_image(new_image)
        result =  Cloudinary::Uploader.upload(new_image.tempfile.path, :transformation => 
            {:width => 400, :height => 400, :crop=> :lfill})

        if self.user_image
            Cloudinary::Uploader.destroy(self.user_image.public_id)
            self.user_image.destroy
        end

        self.create_user_image(
            url: result['url'],
            public_id: result['public_id']
        )
    end


end
