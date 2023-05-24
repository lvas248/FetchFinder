class ParksController < ApplicationController

    def index
        render json: Park.all, status: :ok
    end

    def upload_park_images
        images = params[:images]
        if images.nil?
            render json: { image: 'Must select image(s)'}, status: :unprocessable_entity
        else
            park = Park.find(params[:park_id])
            image_array = []
            images.each do |i|
                image = Cloudinary::Uploader.upload(i.tempfile.path)
                image_array << {url: image['url'], public_id: image['public_id']}
            end
            results_array = park.images.create(image_array)
            render json: results_array
        end
    end


end
