class CreateParks < ActiveRecord::Migration[6.1]
  def change
    create_table :parks do |t|
      t.string :name
      t.string :borough
      t.string :zip
      t.string :surface
      t.boolean :seating
      t.float :lat
      t.float :long
      t.string :address

      t.timestamps
    end
  end
end
