class ParksController < ApplicationController

    def index
        render json: Park.all, status: :ok
    end

    def upload_park_images
        park = Park.find(params[:park_id])
        images = params[:images]
        image_array = []
        images.each do |i|
            image = Cloudinary::Uploader.upload(i.tempfile.path)
            # , :transformation => [{:width => 400, :height => 400, :crop=> :lfill}])
            image_array << {url: image['url'], public_id: image['public_id']}
        end
        results_array = park.images.create(image_array)
        render json: results_array
    end


end
