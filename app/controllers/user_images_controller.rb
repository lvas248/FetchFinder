class UserImagesController < ApplicationController

    def create
        user = User.find(session[:user_id])
        user.upload_and_replace_user_image(params[:image])
        render json: user.user_image
    end

end
