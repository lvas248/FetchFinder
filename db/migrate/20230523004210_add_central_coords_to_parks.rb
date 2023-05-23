class AddCentralCoordsToParks < ActiveRecord::Migration[6.1]
  def change
    add_column :parks, :central_coords, :float, array: true, default: []
  end
end
