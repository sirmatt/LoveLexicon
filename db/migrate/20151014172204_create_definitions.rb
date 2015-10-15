class CreateDefinitions < ActiveRecord::Migration
  def change
    create_table :definitions do |t|
      t.integer :author_id
      t.string :word
      t.text :word_def

      t.timestamps null: false
    end
  end
end
