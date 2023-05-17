class DropUserImages < ActiveRecord::Migration[6.1]
  def change
    drop_table :user_images
  end
end
