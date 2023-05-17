class DropParkImages < ActiveRecord::Migration[6.1]
  def change
    drop_table :park_images
  end
end
