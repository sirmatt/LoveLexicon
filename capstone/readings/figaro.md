# Figaro

## What is Figaro?

[Figaro][figaro] is a gem that allows your app to access secret
information (like private keys) in production (e.g. when it's on
Heroku).

We don't want to store things like our Facebook API SECRET_KEY
directly in our app, because anyone could steal our key and pretend to
be us just by looking at our github repo and finding the right page.

The solution?  Figaro figaro figaro figaro figarroooooooooo...

[figaro]: https://github.com/laserlemon/figaro

## Instructions

Follow them [here][instructions].

The instructions will tell you to run `figaro install`. This requires
that you have figaro v1.0 installed. If you get the error:

    figaro:install: command not found

Then run `bundle update figaro` and look at the `Gemfile.lock` file to
make sure you're using a version of Figaro that is at least v1.0. This
should allow you to then successfully run `figaro install`, which
creates `config/application.yml` and updates your `.gitignore` file.

[instructions]: https://github.com/laserlemon/figaro/blob/master/README.md

## How does it work? A brief overview.

Figaro wants you to put all of your secret stuff in a file called
`config/application.yml`. It also adds this file to your `.gitignore`
file. Git will ignore `config/application.yml`, which means it will
never get added to your local git repo, which means it will never be
pushed to the Github repo.

Locally, variables defined in the YAML file will be available to your
application:

```yml
# config/application.yml
PUSHER_APP_ID: XYZ123
PUSHER_KEY: KEY_KEY_KEY
PUSHER_SECRET: SECRET_SECRET_SECRET
```

The YAML file is read, and environment variables are set up. You might
use these constants in the initialization for Pusher:

```rb
# config/initializers/pusher.rb
Pusher.app_id = ENV["PUSHER_APP_ID"]
Pusher.key    = ENV["PUSHER_KEY"]
Pusher.secret = ENV["PUSHER_SECRET"]
```

How do we setup environment variables on Heroku? Your secrets are
being stored in the `config/application.yml`, which is never checked
into git. That means that it never gets pushed to Heroku, so how will
Heroku know the passwords?

The traditional way to set Heroku environment variables is:

```
heroku config:add PUSHER_APP_ID=XYZ123
heroku config:add PUSHER_KEY=KEY_KEY_KEY
heroku config:add PUSHER_SECRET=SECRET_SECRET_SECRET
```

Since that seems like a lot of typing, we can have figaro read the
`config/application.yml` and run the `config:add` commands for us by
running `figaro heroku:set`.
