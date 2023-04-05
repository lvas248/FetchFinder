
class User < ApplicationRecord
    has_secure_password

    has_one :user_image

    validates :username, { presence: true, uniqueness: true }

    def upload_and_replace_user_image(new_image)
        result =  Cloudinary::Uploader.upload(new_image.tempfile.path, :transformation => 
            {:width => 400, :height => 400, :crop=> :fill})

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
