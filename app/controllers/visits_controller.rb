require 'pry'
class VisitsController < ApplicationController

    def create
        user = get_user
        visit = user.visits.create!(visit_params)
        render json: visit, status: :created
    end

    private 

    def get_user
        User.find(session[:user_id])
    end

    def visit_params
        params.permit(:start_time, :end_time, :park_id)
    end

end
