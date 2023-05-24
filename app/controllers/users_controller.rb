class UsersController < ApplicationController

# signup 
    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

# refresh 
    def show
        user = get_user
        render json: user, status: :ok
    end

# user edit
    def update
        user = get_user
        user.update!(user_params)
        # binding.pry
        render json: user, status: :ok
    end

# user upload image
    def upload_user_image
        user = User.find(session[:user_id])
        image_params = params[:image]
        unless image_params.nil?
            user.upload_and_replace_user_image(params[:image])
            render json: user.image
        end
        render json: { image: 'Image must be selected'}, status: :unprocessable_entity
    end

    private

    def get_user
        User.find(session[:user_id]) 
    end

    def user_params
        params.permit(:username, :password, :password_confirmation, :home_address)
    end
end
