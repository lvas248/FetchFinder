class ParkImagesController < ApplicationController

    def create 
        park = Park.find(params[:id])
        # binding.pry
        images = params[:images]
        image_array = []
        images.each do |i|
            image = Cloudinary::Uploader.upload(i.tempfile.path, :transformation => [
                {:width => 400, :height => 400, :crop=> :lfill}])
            image_array << {url: image['url'], public_id: image['public_id']}
        end
        results_array = park.park_images.create(image_array)
        render json: results_array
    end    


end
