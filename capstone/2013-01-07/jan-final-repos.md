# Capstone project repos

* [App Academy](#app-academy)
* [Paperback Writer](#paperback-writer)

## [App Academy][app-academy-live]

### Description

Website for App Academy ([live][app-academy-live],
[github][app-academy-github]). Lots of static content that describes
the App Academy course. Dynamic component is the application
interface; handles multiple stages of the application pipeline.

Backend that handles the processing of applications from start to
finish.

### Tech

* Responsive design
* JavaScript used for fade, scrolling effects
* pjax so that links don't make a page request or trigger a window
  reload
* SimpleForm application form
* ActionMailer & SendGrid for emailing
* Heroku scheduler for background emailing
* state_machine used for tracking application through review process
* Half-assed roll-your-own auth

[app-academy-live]: http://www.appacademy.io
[app-academy-github]: http://github.com/ruggeri/appacademy.io

## [Paperback Writer][paperback-writer-live]

### Description
A web-based writing tool ([live][paperback-writer-live], [github][paperback-writer-github]) complete with in-browser, autosaving text
editor (with full screen mode), Dropbox backup, tagging, full-text
search, section reordering, and Facebook login.

### Tech
- Rails
- Postgres
- Heroku deploy with NewRelic, SendGrid, and Bonsai (ElasticSearch)
- Dropbox API
- Tableless model (DbClient) managing Dropbox backup
- Full text search with Tire and ElasticSearch
- Omniauth login (Facebook & Dropbox)
- Devise
- AJAX
- JavaScript MVC architecture
- CoffeeScript
- Handlebars Templating
- Underscore.js
- jQuery & jQuery UI
- Zurb Foundaton CSS framework
- SCSS

[paperback-writer-live]: http://paperbackwriter.herokuapp.com
[paperback-writer-github]: https://github.com/rsepassi/paperback_writer

## Magnets
### Description

In the spirit of Apples to Apples and Cards Against Humanity, a gamethat pits users against each other in the field of humor and bad taste. Each round, users are given a prompt, and a set of words which they arrange into poems based on the prompt. Players then vote on their favorite to determine who is the (democratically elected) King of Poems.
([live][magnets-live], [github][magnets-github])

###Technology Used:

- Rails
- Devise
- Foundation
- Framework
- Javascript
- jQuery
- Underscore
- SCSS

[magnets-live]: http://manget-poetry.herokuapp.com
[magnets-github]: https://github.com/seanwooj/magnet-poetry
