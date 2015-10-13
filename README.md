# LoveLexicon

## Minimum Viable Product

LoveLexicon is a web application inspired by UrbanDictionary built using Ruby on Rails
and React.js. Discover expert definitions about relationship woes! LoveLexicon allows users to:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Create an account to post words/definitions
- [ ] Log in / Log out
- [ ] Create, read, edit, and delete words/definitions
- [ ] Search through questions/answers for blocks of text
- [ ] Apply high5 counter or something similar
- [ ] Generate a feed of trending word definitions

## Design Docs
* [View Wireframes](see wireframes in doc)
* [DB schema][schema]

[schema]: ./docs/schema.md

## Implementation Timeline

<<<<<<< HEAD
### Phase 1: User Authentication, User/WordDef Models and JSON API (2 days)
=======
### Phase 1: User Authentication, Definition Model and JSON API (2.5 days)
>>>>>>> 62df3711c14b1a264db9289c503e5e3859ac0816

In Phase 1, I will begin by implementing user signup and authentication (using
BCrypt). There will be a basic landing page after signup that will contain the
container for the application's root React component. Before building out the
front end, I will begin by setting up a full JSON API for WordDef.

[Details][phase-one]

<<<<<<< HEAD
### Phase 2: Flux Architecture and Note CRUD (3.5 days)

Phase 2 is focused on setting up Flux, the React Router, and the React view structure for the main application. After the basic Flux architecture has been set up, a WordDef store will be implemented and a set of actions corresponding to the needed CRUD functionality created.

Once this is done, I will create React views for the WordDefsIndex, WordDefsIndexItem and WordDefForm. At the end of Phase 2, WordDefs can be created, read, edited and destroyed in the browser.

WordDefs should save to the database when the submit button is clicked. Lastly, while constructing the views I will start using simple bootstrap for styling.

[Details][phase-two]

### Phase 3: Navigation Bar (2.5 days)

Next I will be implementing a Navbar React Component that will be the header on all the pages, above the main container for the site. It will have a Logout button for the user to end their session, which will take them back to the landing page.

I will implement a random word button that displays one of the word definitions at random. A ‘Create new word’ button will also live in the navbar, only available to a signed in user. I will display the currently signed in user, finally there will be a logo at the top left.

[Ask about implementations with React or maybe just use Rails]

[Details][phase-three]

### Phase 4: React Dynamic Search Bar (2.5D)

Craft a React search bar component underneath the navbar. The user can dynamically search for words they are looking for, which will display a drop down of matches.

[Details][phase-four]

### Phase 5: Applying the finishing touches on styling

I want to experiment with various animations if possible. Tweak with the Bootstrap to look visually similar to UrbanDictionary. If there’s time, implement some of the bonus features
=======
### Phase 2: Flux Architecture and Definition CRUD (3 days)

Phase 2 is focused on setting up Flux, the React Router, and the React view
structure for the main application. After the basic Flux architecture has been
set up, a Definition store will be implemented and a set of actions corresponding to
the needed CRUD functionality created. Once this is done, I will create React
views for the Definitions `DefIndex`, `DefIndexItem` and `Form`. At the end of Phase 2,
Definitions can be created, read, edited and destroyed in the browser. Definitions should
save to the database when the form loses focus or is left idle after editing.
Lastly, while constructing the views I will start using basic bootstrap for
styling.

[Details][phase-two]

### Phase 3: Navigation bar/Header (2 days)

Phase 3 adds organization to the Definitions. Definitions belong to a User, which has
its own `DefIndex` view. I will create a React component through every Definition's content. It will be the main tool for a user to navigate the site.

[Details][phase-three]

### Phase 4: Landing page views of words and defintiions (2 day)

Phase 4 is all about making sure the landing page displays some users posts

[Details][phase-four]

### Phase 5: Search bar functionality (1 day)

Phase 5 introduces a search bar for the user to look for particular words. I will create a React search bar component, auto populates in real time to show the user.
>>>>>>> 62df3711c14b1a264db9289c503e5e3859ac0816


<<<<<<< HEAD
### Bonus Features (TBD)
- [ ] Link to other words
- [ ] .gif upload functionality
- [ ] Language translation API
- [ ] Social Media link buttons

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
=======
### Phase 6: Styling Cleanup and Seeding (1 day)

Bootstrap will have been used to keep things organized up until now.

### Bonus Features (TBD)
- [ ] Favorite words section
- [ ] Use javascript library for cleaner tag selection
>>>>>>> 62df3711c14b1a264db9289c503e5e3859ac0816
