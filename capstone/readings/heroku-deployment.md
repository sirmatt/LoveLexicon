### Jumpstart

Quick reference for getting up and running with heroku:

```ruby
  # config/environments/production.rb
  config.serve_static_files = true
  # ...
  config.log_level = :debug
```

```ruby
  # Gemfile
  gem 'newrelic_rpm'
```

```sh
  heroku apps:create mycapstoneprojectapp
  git add -A
  git commit -m "update production.rb for assets on heroku"
  git push heroku master
  heroku addons:create newrelic
  heroku addons:open newrelic
```

# Deploying Your App to Heroku

Heroku is a hosting service which will run a Rails web application and
make it accessible to users across the internet. This is in contrast
to running a local development server, which is not accessible to the
wider internet. Heroku is free to start using.

Most of this demo is based on the
[Heroku Rails Documentation][heroku-rails-docs].

A note before you start: **never run `rake
assets:precompile`** [(heres why)][asset-rails-doc]. Heroku is supposed
to do this for you; call a TA if Heroku fails to compile your assets.

[heroku-rails-docs]: https://devcenter.heroku.com/articles/rails3
[asset-rails-doc]: http://guides.rubyonrails.org/asset_pipeline.html#precompiling-assets

### Setup Postgres for Development

Heroku uses Postgres. You should set up your `database.yml` so that
Postgres is used in development (and also add `gem 'pg'` to the
`Gemfile`); this way your development and production environments will
be similar. You may delete the production section of `database.yml`;
Heroku ignores `database.yml`.

### Setup a Heroku Account and Create App

Make a [Heroku][heroku] account if you don't already have one.

Install the heroku toolbelt, which will provide you the command-line
`heroku` program. You can do this one of two ways: (a) using Homebrew,
`brew install heroku`, or (b) download [the DMG][toolbelt-dmg]
and install it.

Go to your [Heroku dashboard][heroku-dashboard] and create a new app:
you can choose a name for your app. The URL will be of the form
`name.herokuapp.com`.

[heroku]: https://www.heroku.com/
[toolbelt-dmg]: https://toolbelt.heroku.com/
[heroku-dashboard]: https://dashboard.heroku.com/apps

### Setup SSH with Heroku

By this time, you should already have
[setup an SSH key][generate-ssh-key] to use with Github.

Just like we gave Github our `~/.ssh/id_rsa.pub` file, we need to do
the same with Heroku. This **public key** is what Heroku uses to make
sure we are are who we say we are and that we are authorized to push
to Heroku. This is in lieu of traditional username/password
authentication.

To add your key, login to `heroku.com` and go to your user settings
(click the top-right image; then account). There is a box where you
can upload a public key. To copy your key into the clipboard, run:
`cat ~/.ssh/id_rsa.pub | pbcopy`. Now paste into the SSH Keys box and
click "Add Key".

[generate-ssh-key]: https://help.github.com/articles/generating-ssh-keys

### Push Your Code

In the command line; go to your project directory. We deploy to Heroku
by pushing our Git repository to Heroku. In the Heroku settings for
your application, find the Git repository URL. Add the Heroku Git
repository as a destination to push code to: `git remote add heroku
git@heroku.com:your-project-name.git`.

Deploy your code to Heroku by pushing to the Heroku Git repository:
`git push heroku master`. In response to your code push, Heroku will
install all the gems, compile assets, and start up a web-server.

You should now be able to visit the application. Check out `heroku
open`.

### Set Up Your Database

With your app's code on Heroku, it's now time to get your database
set up on Heroku. Run the following to execute your migrations:

```bash
heroku run rake db:migrate
```

If you have seed data, you can run:

```bash
heroku run rake db:seed
```

### Get a Domain Name

**NOTE**: You don't have to do this right away, but you should take
care of it eventually so your app looks more legit.

We recommend [namecheap.com][namecheap] for registering domains. Go
Daddy is often a little cheaper, but historically has not worked out as
well for students.

[namecheap]: http://www.namecheap.com/


**Setting up a CNAME**

Canonical names make your hostname point to another. You want
www.mycoolurl.com to point to www.myuncoolurl.herokuapp.com.


*On namecheap.com:*

0. Log in.
0. Hover over "My account" and click "manage domains".
0. Click on your domain.
0. Click "All Host records" in the blue menu on the left.
0. In the "www" row
    * Enter the URL you want to point to under the "IP Address/URL"
      column.
      * This should be in the format `www.google.com.`; no `http://` or
        trailing slash. Namecheap will add the `.` at the end if you
        don't.
    * Select CNAME (Alias) under "Record Type".
0. Click "Save Changes".


*In your terminal*

0. Navigate to the directory that holds your project's repo.
0. Run "heroku domains:add www.mycoolurl.com".

More detailed instructions:
[namecheap setup][namecheap-tutorial]
[heroku setup][heroku-tutorial]

[heroku-tutorial]: https://devcenter.heroku.com/articles/custom-domains
[namecheap-tutorial]: http://www.namecheap.com/support/knowledgebase/article.aspx/1031/2/

### Logging and `heroku run`

You're used to using the server log for debugging purposes. If you
want to view your server log, you can run `heroku logs` from the
command line. Since `heroku logs` only shows the recent logs and then
quits, it is often convenient to run `heroku logs -t`. The `-t` puts
you into **tail** mode; instead of quitting, we'll wait for more and
more logs to print. Logs are your main debugging tool.

The most common heroku command is `heroku run ____`. This will run a
command on the Heroku server as if it were on your own machine. For
instance:

* `heroku run rake db:migrate`

**Useful Commands:**

* Open up your Rails console: `heroku run rails c`
* Remove all data from your database: `heroku pg:reset name_of_your_db`
  * `rake db:reset` or `rake db:drop` won't work on Heroku because you don't
    have permission to drop and create databases.
  * To find the name of your database, go to your app's page on your
    Heroku account, click on *Heroku Postgres* under *Add-ons*, and use
    the name after the `::` following your app's name.

### Asset Precompilation Error

If heroku gives you an error about "rake assets:precompile" failing,
it's likely that your app is initializing before it can precompile your assets.
We want your app to precompile first, before intializing.

Add the following code to your application.rb file:

```ruby
  #config/application.rb

  #...
  config.assets.initialize_on_precompile = false
  #...
```

### Page not found errors?

Make sure you've migrated your database and that all the appropriate
routes, controllers, and views are in place.

### Site looks outdated, even after a push?

You probably precompiled your assets locally before pushing to heroku.
Remove the `public/assets` folder under your Rails app directory.

### No assets?

If you're getting 404 errors for all your assets, make sure that you
have these settings in your `production.rb`:

```ruby
  # config/environments/production.rb
  config.serve_static_files = true
```

### Pingdom/NewRelic

To save time/money, Heroku will put its servers to sleep if your site
isn't accessed every five minutes. If your site application server is
asleep, your page will take a long, long time to load on the next
request because Heroku has to wake it up.

This sucks for you because recruiters will visit your website and they
will get bored.

To keep your servers awake, you want to make sure your site is
accessed at least once every five minutes. That way your server is
never put to sleep.

To do this, use [pingdom][pingdom] or the [newrelic][newrelic]
addon. They can be configured to constantly make requests to your
site. These additionally give you the benefit of sending you emails if
your site goes down (that's what they're actually intended for).

[pingdom]: https://www.pingdom.com/free/
[newrelic]: https://addons.heroku.com/newrelic

**To set up availability monitoring in New Relic:**
Go to the Heroku dashboard, open your app's page, and click on **New Relic APM**
under Resources. From the New Relic Dashboard, click your app's name. There
should now be a side bar on the left-hand side of the window. In the side bar,
click on **Availability Monitoring** under **Settings**. Enter your app's URL,
save your changes, and you should be good to go.

### Internal Server Errors

Heroku's logs are great, but by default they don't give us the nice
error feedback we're used to from the Rails server logs. Luckily, there
are ways to get this information.

One option is to set your application's `log_level` to `debug`. You can
set this manually in `production.rb` or simply install the
`rails_12factor` gem and let the gem do the work.

Another alternative is to install New Relic and use its error recording
and reporting console. First, make sure you've added New Relic to your
app. Go to the New Relic dashboard (as described above), and in the side
bar you'll find an **Errors** listing under the Events heading. This
should show you the errors raised by your app in the last 30 minutes.
Congratulations, you've earned the power of error messages!  Now go
forth and squash bugs.
