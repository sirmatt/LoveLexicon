# Devise

Devise is an authentication solution for Rails. With it, you'll be able to reasonably easily handle user accounts, login, and third-party authentication solutions.

Devise handles authentication through multiple strategies:

* `database_authenticatable`: DB stores an encrypted (hashed)
  password to check the user's authenticity at login
* `token_authenticatable`: DB stores an auth token, which the user can
  submit either in the query string or through HTTP basic auth *(meant for API consumers)*
* `omniauthable`: allows login through Facebook, Twitter, etc.

There are lots of other plugins (e.g., to send confirmation emails, to
provide password recovery, to validate emails and passwords). We'll
focus on the basics, though.

The definitive source for all things Devise will be the Devise [github][devise-github] page and [wiki][devise-wiki].


[devise-wiki]: https://github.com/plataformatec/devise/wiki

---

**Note on Learning Devise:** 

Devise is a big library and the goal here is not to fully understand its inner workings. The goal is to use it to accomplish what you want. 

When you encounter new libraries, there is a tradeoff between speed and understanding; the faster you want to get up and running, the less you'll understand about the library, and the more you take the time to understand the library, the slower you'll get up and running. 

We are going to approach Devise from the perspective of getting you using it quickly. That means giving you a basic level of understanding and the ability to use the docs and other resources to implement more advanced features as needed.

So, [**use the docs**][devise-github], use [**Google**][google-devise], and use [**StackOverflow**][so-devise].

[google-devise]: https://www.google.com/search?q=devise+gem
[devise-github]: https://github.com/plataformatec/devise
[so-devise]: http://stackoverflow.com/questions/tagged/devise

---

## Initial install

Add `gem 'devise'` to your Gemfile, bundle install, and then run the
generator: `rails generate devise:install`.

Devise will give you a few instructions.

```
~/aa/demos/rails/DeviseDemo$ rails generate devise:install
      create  config/initializers/devise.rb
      create  config/locales/devise.en.yml
===============================================================================

Some setup you must do manually if you haven't yet:

  1. Ensure you have defined default url options in your environments files. Here
     is an example of default_url_options appropriate for a development environment
     in config/environments/development.rb:

       config.action_mailer.default_url_options = { :host => 'localhost:3000' }

     In production, :host should be set to the actual host of your application.
```

If you don't set the host, ActionMailer won't know your host name, so
it won't know how to generate links in emails for your users to click
on (in development, use `letter_opener` to see the e-mail generated; if you decide not to use `letter_opener`, you can see the e-mails generated in your server logs).

---
**Note on Environment Config Files**: 

Rails provides you with 3 files in the `config` directory that are specific to various environments. A Rails application operates in one of three environments by default: `test`, `production`, and `development`. Each environment has its own configuration file and any config options specific to those environments should go in their respective config files. The config file will be run on application load (only the one for the environment the app is loading in.)

---


```
  2. Ensure you have defined root_url to *something* in your config/routes.rb.
     For example:

       root :to => "home#index"
```

Devise is going to, by default, redirect a signed in user to here, so make sure you have a root path defined (and as always make sure the root path is at the top of your `routes.rb` file).

```
  3. Ensure you have flash messages in app/views/layouts/application.html.erb.
     For example:

       <p class="notice"><%= notice %></p>
       <p class="alert"><%= alert %></p>
```

Devise is going to use `notice` and `alert` to display login
errors. This is a sensible default for rendering your own notices and
alerts.

```
  4. If you are deploying Rails 3.1 on Heroku, you may want to set:

       config.assets.initialize_on_precompile = false

     On config/application.rb forcing your application to not access the DB
     or load models when precompiling your assets.

===============================================================================
```

This one has nothing to do with Devise, actually. You need to do this
anytime you use Heroku. When the asset pipeline compiles your assets,
it will first try to initialize a connection to your database. Heroku
will not let you do this; it wants to compile your assets before it
connects to the DB. Luckily, this is fine since there's no reason you 
should touch the DB during asset compilation.

**Make sure you follow each instruction provided.**

## Generating the Devise model

You need to create a model for the users. This is where devise will do most of its work. 
This is where the user's email and password digest will be stored.

Devise has a special generator that you should use:

```
$> rails generate devise User
      invoke  active_record
      create    db/migrate/20130225032911_devise_create_users.rb
      create    app/models/user.rb
      invoke    test_unit
      create      test/unit/user_test.rb
      create      test/fixtures/users.yml
      insert    app/models/user.rb
       route  devise_for :users
```

You can see that this did a few things: it created a migration, a
model, and some routes.

### The migration

Let's break down the migration bit-by-bit:

```ruby
class DeviseCreateUsers < ActiveRecord::Migration
  def change
    create_table(:users) do |t|
      ## Database authenticatable
      t.string :email,              :null => false, :default => ""
      t.string :encrypted_password, :null => false, :default => ""
```

Devise is broken into modules. The most basic module is database
authenticatable: credentials are stored in the database which can be
verified later. The user submits their email and a password, which is
checked against the encrypted password (presumably hashed with BCrypt
or some such).

---
**Note on Password Hashing**: 

A new user submits their email and desired password. How are we as app developers supposed to keep this password around to verify logins later? 

**One thing you absolutely do not want to do is store their password in plain text in the database.** 

The data in your database has some security safeguards on it but it's not at the level you'd like for something like a user's password. Plus, you don't want anybody who has access to your database (think employees or contractors or whoever) to be able to see everybody's password.

Part of the solution is to *hash* the password before putting it in your database. From then on, you'll only ever compare hashed strings - i.e. never a submitted password vs. a password in a database, but only a *hashed* submitted password vs. a hashed password in a database.

Devise takes care of all this for you, but it's good to know the basic concept.

---

```
      ## Recoverable
      t.string   :reset_password_token
      t.datetime :reset_password_sent_at
```

The user can request to recover their password. This issues a token by
email, which must be used within a reasonable amount of time.

```
      ## Rememberable
      t.datetime :remember_created_at
```

Used for "Remember Me" functionality so a user doesn't have to log back in when they revisit your site.

```
      ## Trackable
      t.integer  :sign_in_count, :default => 0
      t.datetime :current_sign_in_at
      t.datetime :last_sign_in_at
      t.string   :current_sign_in_ip
      t.string   :last_sign_in_ip
```

This tracks some login statistics, often used to detect suspicious accounts. You probably want to ignore this module.

```
      ## Confirmable
      # t.string   :confirmation_token
      # t.datetime :confirmed_at
      # t.datetime :confirmation_sent_at
      # t.string   :unconfirmed_email # Only if using reconfirmable
```

Confirmable is for confirming a user's email upon sign-up by sending
an email to them with an 'account activation' link. The link should only be
good for a limited period of time.

The reconfirmable module will also perform this confirmation if the
user later changes their email.

```
      ## Lockable
      # t.integer  :failed_attempts, :default => 0 # Only if lock strategy is :failed_attempts
      # t.string   :unlock_token # Only if unlock strategy is :email or :both
      # t.datetime :locked_at
```

This one locks out the user's account. They would be sent
the `unlock_token` in an email.

```
      ## Token authenticatable
      # t.string :authentication_token
```

This is a long-term auth token which the user should send as part
of an API request.

```
      t.timestamps
    end

    add_index :users, :email,                :unique => true
    add_index :users, :reset_password_token, :unique => true
    # add_index :users, :confirmation_token,   :unique => true
    # add_index :users, :unlock_token,         :unique => true
    # add_index :users, :authentication_token, :unique => true
  end
end
```

And finally some indices.

### The model

```
class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
end
```

The `devise` class method tells the model to mix in a bunch of Devise
functionality. In particular, it comes set up to do standard database
authentication - that is, passwords. It also gives us a bunch of other
functionality: it provides methods to help with registration, lets us
easily email ourselves a recovery token, will set a cookie to remember
login, will track user login data, will validate the email and
password.

It also sets a few attributes as mass assignable.

You'll probably want to leave all this as is.

## Helpers

```
 # filters
before_filter :authenticate_user!

# controller helpers
user_signed_in?
current_user

# url helpers
new_user_registration_path
new_user_session_path
destroy_user_session_path
```

These helpers are pretty self-explanatory. You should use them.

## Views

If you want to, you can personally customize the Devise views. To do so, you'll have to tell Devise to actually generate the views and put them in your `views` folder:

```
rails generate devise:views
```

Have at the views. Style and modify them however you'd like.

How to use simple_form with Devise: [`simple_form` with Devise][simple-devise]

[simple-devise]: https://github.com/plataformatec/simple_form/wiki/Simple-Form-with-Devise

## Done

Shazam. You actually have working authentication setup at this point. Go ahead and test it out in your app.

For using third-party login services, check out the reading on [omniauth][omniauth].

[omniauth]: ./omniauth.md

## Additional References

* [Redirect to a specific page][1]
* [Allow users to sign in using username or email][2]
* [Allow users to sign in with something other than email][3]
* [Redirect back to current page after sign in][4]
* [Send emails in the background][5]
* [Create a guest user][6]
* [Add sign in/out/up links][8]
* [More how-to's][7]

[1]: https://github.com/plataformatec/devise/wiki/How-To:-redirect-to-a-specific-page-on-successful-sign-in
[2]: https://github.com/plataformatec/devise/wiki/How-To:-Allow-users-to-sign-in-using-their-username-or-email-address
[3]: https://github.com/plataformatec/devise/wiki/How-To:-Allow-users-to-sign-in-with-something-other-than-their-email-address
[4]: https://github.com/plataformatec/devise/wiki/How-To:-Redirect-back-to-current-page-after-sign-in,-sign-out,-sign-up,-update
[5]: https://github.com/plataformatec/devise/wiki/How-To:-Send-devise-emails-in-background-(Resque,-Sidekiq-and-Delayed::Job)
[6]: https://github.com/plataformatec/devise/wiki/How-To:-Create-a-guest-user
[7]: https://github.com/plataformatec/devise/wiki/_pages
[8]: https://github.com/plataformatec/devise/wiki/How-To:-Add-sign_in,-sign_out,-and-sign_up-links-to-your-layout-template

## Resources
* [Devise Railscast][devise-railscast]
* [Customize Devise Railscast][devise-custom-railscast]
* [Reset Password/Remember Me Railscast][reset-pass-railscast]
[reset-pass-railscast]: http://railscasts.com/episodes/274-remember-me-reset-password
[devise-railscast]: http://railscasts.com/episodes/209-devise-revised
[devise-custom-railscast]: http://railscasts.com/episodes/210-customizing-devise
