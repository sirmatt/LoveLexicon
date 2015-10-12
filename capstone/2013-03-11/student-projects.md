# Student Projects

## Aaron Rama: MyFace

* 90% of facebook
* Users
* Profiles
* Friending
* Posts
* Photos
* Likes
* Galleries
* News feed
* Realtime updates instead of Timed AJAX refresh
    * Use websockets
* Gem called sync gem (works with Faye)
* Straight JS instead of backbone
* Backbone for opening up other views.
* 2wk project

## April Goldman: Four Legs Good

* Airbnb for dogs (but free)
* Devise
* Google Maps API integration
* Form for requesting a sitter
* Profile with dashboard
* Bootstrap tabs
* Backbone views in the tabs
* Message thread
* Pretty heavy Backbone
* Mailer for signup confirmation
* Facebook verification
* Twilio SMS integration
* 2wk project

## David Xu: PlantID

* Upload images of geotagged plant sightings
* Integration with Google Maps/Geocoder
* For each image a thread of comments about that plant.
* Look for plants in your area
    * Present a map of local sightings; let user click to see sighting
      discussion thread.
* Let people search by any family/genus/species
    * Use a collection of related auto-complete boxes
    * Too many family/genus/species to send all the data up-front
    * Send just the family; when they select that, do an ajax request
      for just the genus.
* Mailer to notify potential occurences of watched plants
* Paperclip for image uploads
* Kaminari for pagination of results
* Smartphone integration for GPS and camera?
    * Aren't JPEGs often tagged with geodata?
    * Probably a JS API for this.
* Bootstrap CSS

## Luke Persola: Language exercises

* Language exercises generator
* Users submit phrases, Translators translate them
* **TODO**: 2nd brainstorm.

## Kellen Hart: GSales

* Garage sales mapping application.
* Landing page that you enter zipcode to.
* Takes you to a google map that lists the garage sales in that area.
* Pins are garage sales that will be haping the next weekend.
* You'll be able to filter by Friday, Saturday or Sunday.
    * Javascript used to interactively filter.
* You can signup and create an account.
* You'll be able to favorite listings.
* You'll be able to make listings.
* But the idea is to write a scraper of CL.
    * A bg job that will kick off the scraping.
    * Will insert them into the database.
    * Maybe use whenever? Is Heroku Scheduler good enough for this?
* Try to tag the listings; filter by tags?
* Maybe have collorative tagging?
* Have some punishment.
* Bootstrap
* Plan is to be a 1wk project

## Ean Huddleston: WhatsUp

* For local, time-sensitive events.
* Specify a distance from your central location.
* Should list those events.
* Check which types of events you're interested in.
    * E.g., live music
* Models
    * Users.
    * Events.
    * EventTypes.
* Get an email. User specifies:
    * frequency of emails.
    * # of events per email.
    * how far out to look for events.
    * radius to search.
    * subject.
    * calculate a trust score.
* Anyone can submit a new event.
* Anyone can vote on a submission and flag it as spam.
* Event page
    * Use paperclip to submit images
    * Tie it in with google maps
    * Have comments
    * Implement infinite scroll for comments
    * Lookup kaminari for pagination of results
    * Maybe indicate if they're going to attend; count number of folks
      that are going.
* Integrate with twitter
    * Event planner adds hashtags to follow
* Maybe they can add youtube video links
* The user has a dashboard page
    * Presents a google map with pins of locations of events of
      interest.
    * When you hover over a pin highlight the details of the task.

## Roman Gurovich: dish.io

* Unsolicited, anonymized feedback.
* Make teams of people that you trust.
    * Search for people.
    * Maybe just make an ajax request to the server and search a REGEX
      where the current text-box conents are the prefix.
    * https://github.com/crowdint/rails3-jquery-autocomplete
* Team form allows you to choose team members on the same form.
* All the unsolicited feedback so far; depends on the team.
* Use the Twilio API to validate that the users are real people.
* Feed page of all your recent feedback.
* Add silence feature.
* A way to publish a feedback and get a vote.
    * Provide options for the votes.
    * Use JS to add more option fields.
* SPA, backbone.
* 1wk project? Do everything except the survey first.

## Steven Li: Forums

* Discussion forum
* SuperForum and SubForum
* Users and Posts
* Posts have replies
* Nested form for user and profile
* Mail on subscription to a post
* Nested route for `/users/123/posts`
    * Forum show page vs `/forums/123/posts`
* JS and AJAX for comment submission.
* A class of super-users could have the ability to create new fora.
* Paperclip to upload avatars
* Kaminari for post pagination
* Look into and set up delayed job to send emails to users.

## Dylan Clark: Roommates

* Chore tracker
* Assigning, tracking, and reminding people about recurring tasks.
* Models
    * Houses
    * Users
    * Chores
    * Assignments
    * Reminders
        * Would send out an email about a task
        * Twilio SMS
* SPA, backbone
* Devise and OAuth
* Delayed job
* Extras:
    * Gravatars
    * Responsive
* 1wk project

## Anthony Woo: VideoPreview

* App to upload videos, converts them to animated GIFs.
* Uses DJ to process the videos
* User
* Index page of most popular previews
* Comments
* Tags
* 1wk project

## Matt Shopsin: PDF Tagger

* Modified PDF viewer.
* User tags a portion of the document with any request text.
* They can leave a message describing what they want done.
* Store the annotation on the DB.
* Users and documents.
* Assign workers to a document.
* Paperclip and S3

## Nate Hayflick:

* Photo gallery
* Paperclip for uplaod
* Add users, galleries, photos
* Add tagging
* Metro UI interface
* Backbone application
* jQuery UI: draggable
* 1wk project

## Dale Knaus: CodeNotes

* Break down notes about code into their key concepts, reference
  materials, samples.
* Backbone app.
* JS heavy note form; has nested models for code sample, concepts,
  links.
* Browse by note, language, any tags they have.
* Post to evernote afterward.
* Full text search? Solr?
* 1wk project.

## Joshua Willborn: Brocator

* Tracker of where they are.
* Google maps they check in.
* Put their address, email in.
* Build profiles.
* Search a map for nearby folks.
* Events
    * Invite users
    * Host can verify people who showed up
    * They can say whether they are attending.
* Facebook signup.
* Step 1: user profile edit page.
* Step 2: show the google map with people's approximate location.
* Step 3: Event form and show
* Step 4: Event invitations

## Eric Lin: Data Visualization

* Presents a number of factors to select from
* Performs a linear regression to plot a best fit line
* For more complicated regressions, schedule the server to run a
  Delayed Job to fit the data
* Try to connect R to Ruby for offline processing
* Use Paperclip to upload new datasets
* Users have data files.

## Daniel Tsui: Cycling App

* Clone of strava
* Takes in a GPX file
* Parse it, store all the data in the backend
* Perform clientside visualization with D3
    * Overall speed
    * Elevation changes
    * Comparisons between routes
    * Map them to google maps
* 1wk project

## James Yu: Yelp 2.0

* Review individual dishes at restaurants.
* Let people search by dish type
* Restaurant locations on minimap
    * Google maps api.
* Review form; upload photo with paperclip, numerical score.
* Use JS to make some of the forms.
* Admins can add restaurants, dishes types.
* Users can vote on photos to choose the best one.
* 1wk project.

## Peter Lin: DevList

* LinkedIn knockoff
* 2wks project.

## Darwish Gani: NoNameReader

* Social news reader
* Share what you're reading
* Maybe integrate with Facebook and Twitter
* Keep track of what you've read
* Group all urls with similar domains
* Browse by sites
* You can go on someone else's page to see what they've read.
* Bookmarklet to record a page that's read.
* **TODO**: 2nd brainstorm.

## Brian Heithaus: Chess game

* Build the chess library and stick in lib
* YAML Serialize the game to a `Game` model class
* Websockets to push moves to the player
* Faye and sync gem (talk to Aaron about this)
* Text chat
* WebRTC video chat eventually? Maybe do this last.
* Voice activated moves.
* 1wk project.

## Ian Morrison: EquisiteGIF

* Collaborative animation.
* Each person draws a frame.
* Gets crunched into a GIF.
* Models
    * Users.
    * Animations.
    * Frames.
        * belongs to a User.
    * Invitations.
        * Represents a Userw ho will take a turn.
* Animation page
    * If you're not the next user it gives you next frame.
    * Else you get the chance to draw.
* Finally GIF crushing
* Look at Sarah Ketabchi's project for inspiration?
    * https://github.com/sarahketabchi/DoodleApp
* Send emails when it's your turn through ActionMailer
    * Also when everyone's done
* 1wk project.

## Nick Hong: RPG 

* Character moving around on a map.
* Inventory and equip.
* It will make AJAX requests to change items.
* Connect to your twitter account.
* Game would check for tweet; check if this geotagged tweet was in the
  right spot.
* If so they get an item.
* You'd get a free in game item
* Integrate twitter
    * Tweet on their behalf when they get to a room.
* Maybe go with an MMA video commentary system.

## Bryant Detwiller

* Tie instagram to events.
* Show friend's photos.
* Maybe track user likes.
* Beware latency problems of tying the event API with photos.
* One solution is to let users generate events through your API,
  periodically fetch photos for the event from instagram.
* 1wk project.
