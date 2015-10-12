#Delayed Job

##About
Delayed Job is a useful gem for pushing your application's slower tasks into the
background. It creates a table in your database that acts as a TODO list of tasks. 
Doing this allows your server to process work asynchronously, so
that your responses are not unnecessarily delayed. 

##Installation
Since we're using Active Record you're going to want to install that
version of DJ. `gem 'delayed_job_active_record'` and bundle install.  

```bash
rails generate delayed_job:active_record
rake db:migrate
```

##Building A Queue
Delayed Job provides a delay method that you can use to
queue work to be run in the background of your application:

`@photo.delay.upload`

This will create an entry into the delayed_jobs table with instructions
to call #upload on the specified Photo.

If you have methods that are always meant to be processed asynchronously
you can specify this desire in your model with `handle_asynchronously`

```ruby
class CatCircle < ActiveRecord::Base
    def flip_hats
        1_000_000_000.times do { flip_hat }
        save
    end
    handle_asynchronously :flip_hats
end
```
`handle_asynchronously` can take a few options to specify priorty
(represented by an int value) or a time proc

```ruby
def daily_reminder
    #stuff
end
handle_asynchronously :daily_reminder, run_at => Proc.new { 1.day.from_now }

def of_utmost_urgency
    #really important stuff
end
handle_asynchronously :of_utmost_urgency, priority => 9001
```
To delay an email, leave off the deliver call.
```ruby
UserMailer.delay.welcome_email(user) # don't use deliver
```

##Performing the Work
Ok, now that we've queued up a bunch of processes to be performed in the
background, we need to set up a process to start doing the work.  
The easiest way to do this is by using `rake jobs:work`. This sets up a
worker that checks the database ~every 5 seconds and performs any jobs
that need to be done. Tell it to stop with `CTRL-C`.  

If you just want to make one pass and exit, you can use `rake
jobs:workoff`.

Optionally you can define and specify which queues you want to work off.  
Clear all jobs with `rake jobs:clear`

Be aware that running a worker on a Heroku app will fire up an
additional dyno and consume your precious free monthly hours. Plan
accordingly.
