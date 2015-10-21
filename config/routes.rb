Rails.application.routes.draw do
  root to: "static_pages#root"

  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]
  namespace :api, defaults: { format: :json } do
    resources :definitions, only: [:index, :create]
  end

  # namespace :api, defaults: { format: :json } do
  #   resources :users, only: [:show] do
  #     resources :definitions, only: [:index, :create]
  #   end
  #   resources :definitions, only: [:destroy, :update, :show]
  # end
end
