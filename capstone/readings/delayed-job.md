# Delayed job

## Intro

Currently, our Rails app does all of its work as part of the
request-response cycle. The user issues a request, the server
processes it, and it eventually returns a response.

Sometimes you need to do work outside the request cycle. For instance:

* You may want to schedule work to be done at a later time. For
  instance, you may want to wait a few days before sending a new user
  a reminder email about your site.
* You may want to do something presently, but it may take a few
  seconds, and you don't want to hold up responding to the user's
  request and delaying their page load. For instance, you may want to
  send a confirmation email on user signup, but emailing can take a
  few seconds to send.

To do this, we use the `delayed_job` gem; this will let us schedule
work to be done later. At a later point, a worker process (not a web
server) will come around to finish the scheduled work.

## References

The Heroku documentation has a great description of how to use delayed
job (https://devcenter.heroku.com/articles/delayed-job).

First they have you setup DJ; this involves installing the gem,
running `rails generate delayed_job:active_record` to generate a
migration to add a jobs table to your DB, and then `rake db:migrate`
to actually run the migration.

When you schedule a delayed job, DJ will store it in this new
table. You don't have to use this db table yourself, but it needs to
be there for DJ to use.

It will have you add a line to your `Procfile`; the procfile lists
what kind of work each process should do. A standard `Procfile` has
`web` processes start a Rails server, while `worker`processes should
run `rake jobs:work`. The `rake jobs:work` task will just take jobs
one-by-one out of the database, complete them, and then move on to the
next.

`worker` processes never handle web requests, and `web` processes
never handle DJ work. That's what we want; we want the `web` processes
to schedule work for the `worker`s, so they can get back to speedily
serving a web response.
