class CreateDefinitions < ActiveRecord::Migration
  def change
    create_table :definitions do |t|
      t.integer :author_id
      t.string :word, null: false
      t.text :word_def, null: false

      t.timestamps null: false
    end
  end
end
