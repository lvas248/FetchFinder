Rails.application.routes.draw do
  
  
  # resources :images
  # resources :comments
  resources :parks

  post '/parks/upload_images/:park_id', to: 'parks#upload_park_images'

  patch '/visits/:visit_id', to: 'visits#update'
  post '/visits', to: 'visits#create'
  delete '/visits/:visit_id', to: 'visits#destroy'

  post '/comments', to: 'comments#create'
  delete '/comments', to: 'comments#destroy'
  patch '/comments/:id', to: 'comments#update'

  post '/park_images/:id', to: 'park_images#create'

  get 'sessions/create'
  get 'sessions/destroy'

  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  patch '/user', to: 'users#update'
  post '/upload_user_image', to: 'users#upload_user_image'
  
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  post 'upload_user_image', to: 'user_images#create'

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
