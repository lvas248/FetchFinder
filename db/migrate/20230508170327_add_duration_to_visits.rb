class AddDurationToVisits < ActiveRecord::Migration[6.1]
  def change
    add_column :visits, :duration, :integer
  end
end
