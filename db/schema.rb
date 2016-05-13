# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160513104308) do

  create_table "retrospective", force: :cascade do |t|
    t.string   "user_identity", limit: 255, null: false
    t.string   "name",          limit: 512
    t.string   "slug",          limit: 255, null: false
    t.datetime "created_at",                null: false
  end

  create_table "retrospective_note", force: :cascade do |t|
    t.string   "user_identity", limit: 255,  null: false
    t.string   "content",       limit: 2056
    t.integer  "designation",   limit: 4,    null: false
    t.datetime "created_at",                 null: false
    t.datetime "last_modified",              null: false
    t.string   "identity",      limit: 255
  end

  create_table "retrospective_note_map", force: :cascade do |t|
    t.integer "retrospective_id", limit: 4, default: 0, null: false
    t.integer "note_id",          limit: 4, default: 0, null: false
  end

  create_table "retrospective_note_rating", force: :cascade do |t|
    t.string "user_identity", limit: 255, null: false
  end

  create_table "retrospective_note_rating_map", force: :cascade do |t|
    t.integer "note_id",        limit: 4, default: 0, null: false
    t.integer "note_rating_id", limit: 4, default: 0, null: false
  end

  create_table "team_members", force: :cascade do |t|
    t.integer "team_id",       limit: 4
    t.string  "user_identity", limit: 36
  end

  create_table "teams", force: :cascade do |t|
    t.string "name",             limit: 512
    t.string "account_identity", limit: 36
  end

  create_table "user", force: :cascade do |t|
    t.string   "identity",               limit: 255
    t.string   "first_name",             limit: 255
    t.string   "last_name",              limit: 255
    t.string   "initials",               limit: 255
    t.string   "email",                  limit: 255, default: "", null: false
    t.string   "encrypted_password",     limit: 255, default: "", null: false
    t.string   "reset_password_token",   limit: 255
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          limit: 4,   default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip",     limit: 255
    t.string   "last_sign_in_ip",        limit: 255
  end

  add_index "user", ["email"], name: "index_user_on_email", unique: true, using: :btree
  add_index "user", ["reset_password_token"], name: "index_user_on_reset_password_token", unique: true, using: :btree

end
