class DropDurationFromVisits < ActiveRecord::Migration[6.1]
  def change
    remove_column :visits, :duration
    add_column :visits, :end_time, :datetime
  end
end
