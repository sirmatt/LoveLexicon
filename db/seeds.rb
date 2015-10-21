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
word2 = Definition.create(author_id: 2, word: "It’s whatever.", word_def: "It is very significant and it is affecting every single facet of my day.")
word3 = Definition.create(author_id: 3, word: "I want to take it slow.", word_def: "I kind of want to make sure you’re not insane before I get attached.")
word4 = Definition.create(author_id: 4, word: "I’m not like other girls.", word_def: "I have a really warped view on what ‘other girls’ do and will probably be really suspicious of any female friends you do have.")
word5 = Definition.create(author_id: 2, word: "She's just a friend.", word_def: "I’m flattered by your jealousy and I swear I’ve never slept with her. If I had, we probably wouldn’t still be friends.")
word6 = Definition.create(author_id: 3, word: "It's my fault, I'm sorry", word_def: "We’ve been arguing about this for hours and I just can’t take it anymore. Congratulations, you wore me down.")
word7 = Definition.create(author_id: 4, word: "My ex was kind've crazy", word_def: "This is going well and I’m very attracted to you, but please, please, please, if you’re crazy, reveal it as soon as possible.")
word8 = Definition.create(author_id: 1, word: "It's a guy thing.", word_def: "If you don’t get it, I can’t explain it. Don’t worry about it, it’s not a big deal, and it’s probably stupid anyway. Can we drop it?")
