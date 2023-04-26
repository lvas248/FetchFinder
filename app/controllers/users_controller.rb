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




    private

    def get_user
        User.find(session[:user_id]) 
    end

    def user_params
        params.permit(:username, :password, :password_confirmation, :home_address)
    end
end
