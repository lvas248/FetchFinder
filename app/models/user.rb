
class User < ApplicationRecord
    has_secure_password

    has_one :user_image
    has_many :comments
    has_many :visits

    validates :username, { presence: true, uniqueness: true }

    geocoded_by :address
    after_validation :geocode, if: :address_changed?
    
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

    def address
        self.home_address
    end

    def address_changed?
        self.home_address_changed?
    end

end
