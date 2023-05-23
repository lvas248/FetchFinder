class RemoveLongAndLatFromParks < ActiveRecord::Migration[6.1]
  def change
    remove_column :parks, :long
    remove_column :parks, :lat
  end
end
