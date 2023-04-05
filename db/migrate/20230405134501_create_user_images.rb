class CreateUserImages < ActiveRecord::Migration[6.1]
  def change
    create_table :user_images do |t|
      t.string :url
      t.string :public_id
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
