class AddHomeAddressToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :home_address, :string
    add_column :users, :latitude, :float
    add_column :users, :longitude, :float
  end
end
