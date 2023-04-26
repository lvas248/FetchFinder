class CommentsController < ApplicationController

    def create
        user = get_user
        comment = user.comments.create!(comment_params)
        render json: comment, status: :created
    end

    def destroy
        user = get_user
        comment = user.comments.find(params[:id])
        comment.destroy
        head :no_content
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