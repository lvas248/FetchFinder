class ParksController < ApplicationController

    def index
        render json: Park.all, status: :ok
    end

end
