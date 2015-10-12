# Capstone Projects

## The Capstone Project

The last two weeks of the course are spent building independent
projects. Your goal in building these projects should be:

0. Polish the skills you've learned by putting them to the test with a
   long-duration project,
0. Build something you're proud of that can woo employers and show
   them what you are capable of.

During the next two weeks, we will continue to have lightning-talk
style lectures, but we will not assign additional projects. These
two weeks are your time to build what you want, rather than what we
assign. We will continue to circulate to help you build your projects.

You should build one or two projects. It's much better for your one
project to look really good than that you have two projects; the
second project is a lot less important. All things being equal, I
suggest spending extra time on the first project, because time spent
on a second project will involve repeating basic things you already
did on the first (authentication/login, building your schema, etc).

### Demo day

We will demo your project end of week twelve. We invite
past/future students to check out your projects, plus hiring partners.

Just to calibrate expectations: a couple people sometimes get jobs
from demo day, but the proportion of hiring partners to total places
you apply is low, and these are your first interviews. Treat demo day
as practice for talking with potential employers about what you can
do. So don't be stressed about your job search based on how demo day
goes.

## Selecting a Project

First, you may not clone an app that we have already partially cloned in
class. That would defeat part of the purpose of your capstone project,
which is to give you the experience of architecting and building an app
from the ground up. Projects that we have already cloned include Trello,
Twitter, Reddit, and an RSS feed reader app. Similarly, you may not
clone Tumblr, as this is already architected for you in the [sample
project proposal][sample-project].

[sample-project]: https://github.com/appacademy/sample-project-proposal

Second, I very, very strongly recommend that you clone an existing
product. [Here are some project ideas][project-ideas].

Why avoid making something totally new?

0. You'll waste a lot of time in feature discovery, figuring out what the
   application should do. Designing a product is hard!
0. Your projects are supposed to be about displaying your technical
   chops. Anything that takes you away from that is a distraction.
0. Existing apps will push you to learn new things (how did they
   implement that feature?). Your project will be more defined by
   what you already know if you build something of your own
   conception.
0. Honestly, you may find out your project is not very interesting or
   very enjoyable to use. It may not be technically feasible.

Just because you are cloning an existing project doesn't mean you have
to copy every feature. If you want to clone AirBnB, you can make
AirBnB for dogs. Likewise, feel free to innovate on any of these
projects, leave extraneous features out, add new features.

At the end of the day, this is your own project, but my advice is
based on having seen people build >100 projects. I strongly believe
you should keep your project inspired by something that already exists
in reality.

[project-ideas]: https://github.com/appacademy/backbone-curriculum/blob/master/w7d3/projects-to-clone.md

### Write me!

I would like people to write me their project ideas so I can consider
and approve them. Things I want to know include:

* In short, what are you building? (This is easy if it's a clone).
* What features will it have? Give me a basic order of what features
  you'll work on first. I want to make sure that you only begin
  stretch goals last.
* The goal is to demonstrate what you've learned. What features of
  Ruby/Rails/JavaScript/Backbone will your project demonstrate?
  There's a list to think about below.

## Random Instructions

Make sure to use git throughout. Setup git on your machine properly so
that your commits are properly attributed to you. Commit early and
**often**; you'll have lots of bugs, and if you introduce major
problems you can always rollback to a git checkout that was
working. Make sure to push often, too.

Write a proper README.md in the base of your project (delete
README.rdoc). Potential employers don't want to see the standard Rails
boilerplate README.

Make sure your application is accessible to potential employers:

* Deploy to Heroku. My advice: pay $15 to set up the domain name; it
  will look way more professional than `xyz.herokuapp.com`. Also
  you'll learn how to do this.
* Make sure that Pingdom or NewRelic is set up so that it doesn't take
  horrendously long for your page to load.
* Make sure that you provide a guest account that the user can log
  in to. Make sure that there is some data in your app so that the user
  can play around with it a little bit.

Do not do your project TDD, you'll burn up a lot of time doing
this. You may wish to add tests if you have extra time.

## Technology Checklist

Your projects should emphasize the technologies you've
learned. Remember, the projects are a showcase of your technical
ability. Make sure to demonstrate what you can do!

### Rails

* [bad ass logo][logo-gen]
* Basic CRUD
* Complex forms
* Authentication
    * I'd make my own rather than use Devise.
* Bootstrap (SF only)
* ActionMailer/Sendgrid
* Partials, helpers
* Routing
* File upload (paperclip or filepicker.io)
* Pagination
* Consuming 3rd Party APIs
* Omniauth
* delayed_job

[logo-gen]: http://www.squarespace.com/logo

### JavaScript/Backbone

* jQuery
    * jQuery UI: draggable/sortable
* AJAX
* Backbone
* Building your own API for consumption by Backbone.
