Rails.application.routes.draw do
  devise_for :users, :controllers => { registrations: 'registrations' }
  post 'pusher/auth'

  get 'retrospective/index'
  post 'retrospective/list' => 'retrospective#list'
  post 'retrospective/create' => 'retrospective#create'
  post 'retrospective/savenote' => 'retrospective#save_note'
  post 'retrospective/loadusers' => 'retrospective#load_users'
  post 'retrospective/incrementnotecount' => 'retrospective#increment_note_count'
  post 'retrospective/removenote' => 'retrospective#remove_note'

  get '/:slug' => 'retrospective#load_retrospective'

  root to:'retrospective#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
