class CommentsController < ApplicationController

    def create
        user = User.find(session[:user_id])
        comment = user.comments.create!(comment_params)
        render json: comment, status: :created
    end

    private

    def comment_params
        params.permit(:park_id, :comment)
    end

end

# Figure out params issue