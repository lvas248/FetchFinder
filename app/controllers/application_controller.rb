class ApplicationController < ActionController::API
  include ActionController::Cookies
  rescue_from  ActiveRecord::RecordInvalid, with: :render_invalid
  rescue_from  ActiveRecord::RecordNotFound, with: :render_not_found

  private

  def render_invalid(invalid)
    render json: { errors: invalid.record.errors }, status: :unprocessable_entity
  end

  def render_not_found
      render json: { error: "User not found"}, status: :unauthorized
  end

end
