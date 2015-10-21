# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

matt = User.create!(username: "Matt", password: "password")
roxanne = User.create!(username: "Roxanne", password: "butterfly")
tom = User.create!(username: "Tom", password: "shrimp")
shelly = User.create!(username: "Shelly", password: "bagel1")

word1 = Definition.create(author_id: 1, word: "I'll call you", word_def: "I’m not going to call you. Well, I might. Probably not, though.")
word2 = Definition.create(author_id: 2, word: "apple-bottom", word_def: "Jeans, boots with the fur")
word3 = Definition.create(author_id: 3, word: "apple-bottom", word_def: "Jeans, boots with the fur")
word4 = Definition.create(author_id: 4, word: "apple-bottom", word_def: "Jeans, boots with the fur")
word5 = Definition.create(author_id: 2, word: "apple-bottom", word_def: "Jeans, boots with the fur")
word6 = Definition.create(author_id: 3, word: "apple-bottom", word_def: "Jeans, boots with the fur")
word7 = Definition.create(author_id: 4, word: "apple-bottom", word_def: "Jeans, boots with the fur")
word8 = Definition.create(author_id: 1, word: "apple-bottom", word_def: "Jeans, boots with the fur")
