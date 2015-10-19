class Definition < ActiveRecord::Base
  validates :author_id, :word, :word_def, presence: true

  belongs_to :user
end
