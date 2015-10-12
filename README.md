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

### Phase 1: User Authentication, Definition Model and JSON API (2.5 days)

In Phase 1, I will begin by implementing user signup and authentication (using
BCrypt). There will be a basic landing page after signup that will contain the
container for the application's root React component. Before building out the
front end, I will begin by setting up a full JSON API for Notes.

[Details][phase-one]

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


### Phase 6: Styling Cleanup and Seeding (1 day)

Bootstrap will have been used to keep things organized up until now.

### Bonus Features (TBD)
- [ ] Favorite words section
- [ ] Use javascript library for cleaner tag selection
