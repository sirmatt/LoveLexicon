# Getting started

It's important to stay organized as you work through a large project, so we've come up with a skeleton to help you stay on track. We've broken down the project into several phases to make it all seem more manageable.

We **require**:

* Checking in with your TAs at least once a day, to show progress you've made.
* Checking in with your TAs whenever you complete a phase, to make sure you're on the right path.

The days listed for each phase are guidelines. Don't worry if you're moving faster than expected; DO, however, check in with a TA before you move from phase to phase, so we can see that you've done everything listed.

## Proposal phase (w7d3 - w7d5)
In the proposal phase, you should figure out [which project you're going to clone][clone-link]. You should think about the following:

* What features of this site am I going to clone?
  * When it comes time to demo your app, you don't want to waste time explaining features. Remember, the point is to show off your __technical skill__.
* Will these features show off everything I've learned in the course?

## Preparation phase (w7d6 - w8d1)
Before writing any code, it's important to have a good roadmap of what exactly your project will need to be 'useable'.

* What is your minimum viable product (MVP)? What is the least you could have that will show off your skills to employers?
  * Once you've figured this out, list the features of your MVP by importance. Use this list to guide your development.
* How will your data layer look? Write up a schema, and think carefully about what data you need to store, and how you should store it.
* What APIs will you need?
* [Paper prototype][paper-prototyping] your project!
  * Each view should be its own sheet of paper.
  * This should cover 100% of your views.
  * It doesn't need to be extremely detailed, but major features should be represented. Don't forget to draw out all your forms.
  * TAs should be able to "click through" your app using the paper prototype.
* Figure out what routes you will need, i.e. what you want your URLs to look like.

[paper-prototyping]: http://en.wikipedia.org/wiki/Paper_prototyping
[clone-link]: https://github.com/appacademy/backbone-curriculum/blob/master/w7d3/projects-to-clone.md

## Rails phase (w8d2 - w8d4)
Before we get fancy with Javascript & CSS, it's important to have a pure Rails/HTML version of your project. If you think your app is an exception and can't be done entirely in Rails first, talk to a TA.

* Write your app feature by feature, purely in Rails and [semantic HTML][semantic-html].
* Do NOT worry about design/CSS yet. Seriously, this is a huge trap.
* Write [RSpec tests for every model][rspec-models] as you go. This is an easy win, and a huge boon for employment.
* [Push your project to Heroku][heroku] at the end of each day.

[semantic-html]: https://github.com/appacademy/js-curriculum/blob/master/w7d5/CSS/semantic-html.md
[rspec-models]: https://github.com/appacademy/rails-curriculum/blob/master/w5d4/rspec-models.md
[heroku]: ../readings/heroku-deployment.md

## Design phase (w8d4 - w8d5)

* Add basic CSS to your app to make it mimic your wireframes.
* Now is __not__ the time to add color, flash, subjective stuff &c.
* Focus on layout & positioning.

## Javascript phase (w8d5 - w9d2)

* Identify areas of your app where interactivity should be snappy.
* Identify areas of your app where user interaction should go beyond just clicking links. Think of native desktop applications - i.e. would drag and drop be useful here, would pop-up menus be useful, etc.
* Identify areas where an MVC pattern would be useful. Think about how you would structure these areas using Backbone.js.
  * When using Backbone, you don't always need to leverage the full architecture, i.e. you may not always need a router or a ton of views. But the organization Backbone affords you can make using it worthwhile.
* Identify areas where UJS (Rails' unobtrusive javascript) may be useful.
  * Adding UJS is much easier than writing your own AJAX functions, so use it whenever possible.
* Do UJS first.
* Start with inline scripts when developing, but push to [organized JS][revealing-module-pattern] on completion of a single feature.

[revealing-module-pattern]: https://github.com/appacademy/js-curriculum/blob/master/w6d1/module-pattern.md

## Polish phase (w9d3+)
If you're at this phase, you have an MVP! To see that it really is an MVP, do the following:

* Take some time to use your app, walk through each feature, starting at sign up.
* Have your neighbor try your app and return the favor.
* Does the interactivity work well?
* Does it look good enough?
* Have you nailed the execution of the implemented features?

Then **clean up your code**:

* Is my JavaScript organized?
* Do I have test coverage for my models?
* Are my Ruby methods in the right place? Hint: Really long controller actions are a good indication you can push stuff into your models.

Finally, beautify. Spend one or two hours tweaking your CSS, adding color and character to your app (DO NOT GET STUCK ON THIS! IT'S A TRAP!)
