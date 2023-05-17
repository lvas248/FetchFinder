class RemoveHomeFromUsers < ActiveRecord::Migration[6.1]
  def change
    remove_column :users, :home_address
  end
end
