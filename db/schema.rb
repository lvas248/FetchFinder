# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2023_05_01_174059) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "park_id", null: false
    t.text "comment"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["park_id"], name: "index_comments_on_park_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "park_images", force: :cascade do |t|
    t.bigint "park_id", null: false
    t.string "url"
    t.string "public_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["park_id"], name: "index_park_images_on_park_id"
  end

  create_table "parks", force: :cascade do |t|
    t.string "name"
    t.string "borough"
    t.string "zip"
    t.string "surface"
    t.boolean "seating"
    t.float "lat"
    t.float "long"
    t.string "address"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "user_images", force: :cascade do |t|
    t.string "url"
    t.string "public_id"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_user_images_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "home_address"
    t.float "latitude"
    t.float "longitude"
  end

  create_table "visits", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "park_id", null: false
    t.datetime "start_time"
    t.integer "duration"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["park_id"], name: "index_visits_on_park_id"
    t.index ["user_id"], name: "index_visits_on_user_id"
  end

  add_foreign_key "comments", "parks"
  add_foreign_key "comments", "users"
  add_foreign_key "park_images", "parks"
  add_foreign_key "user_images", "users"
  add_foreign_key "visits", "parks"
  add_foreign_key "visits", "users"
end
