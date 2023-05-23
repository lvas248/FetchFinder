class DropTypeFromParks < ActiveRecord::Migration[6.1]
  def change
    remove_column :parks, :type
    add_column :parks, :geometry_type, :string
  end
end
