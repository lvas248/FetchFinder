Rails.application.routes.draw do
  
  get 'sessions/create'
  get 'sessions/destroy'

  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  patch '/user', to: 'users#update'
  
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  post 'upload_user_image', to: 'user_images#create'
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
