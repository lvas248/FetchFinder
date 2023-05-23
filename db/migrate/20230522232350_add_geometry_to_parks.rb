class AddGeometryToParks < ActiveRecord::Migration[6.1]
  def change
    add_column :parks, :geometry, :geometry, geographic: true
    add_column :parks, :type, :string
    add_column :parks, :coordinates, :float, array: true, default: []
  end
end
