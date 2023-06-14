require 'pry'
class VisitsController < ApplicationController

    before_action :authorize
    
    def create
        user = get_user
        visit = user.visits.create!(visit_params)
        render json: visit, status: :created
    end

    def update
        user = get_user
        visit = user.visits.find(params[:visit_id])
        visit.update!(visit_params)
        render json: visit, status: :created
    end

    def destroy
        user = get_user
        visit = user.visits.find(params[:visit_id]).destroy
        visit.destroy
        render json: visit, status: :ok
    end

    private 

    def get_user
        User.find(session[:user_id])
    end

    def visit_params
        params.permit(:start_time, :duration, :park_id)
    end

end
