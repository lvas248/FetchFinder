class CommentsController < ApplicationController

    before_action :authorize

    def create
        user = get_user
        comment = user.comments.create!(comment_params)
        render json: comment, status: :created
    end

    def update
        user = get_user
        comment = user.comments.find(params[:id])
        comment.update!(comment: params[:comment])
        render json: comment, status: :created
    end


    def destroy
        user = get_user
        comment = user.comments.find(params[:id])
        comment.destroy
        head :no_content, status: :ok
    end

    private

    def get_user
        User.find(session[:user_id])
    end

    def comment_params
        params.permit(:park_id, :comment)
    end

end

# Figure out params issue