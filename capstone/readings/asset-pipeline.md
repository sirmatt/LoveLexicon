# Asset Pipeline

## Purpose

So far we've focused on rendering HTML content. But styling rules are
kept in CSS files and JavaScript code meant to be run by the client is
kept in JS source files. These are not (typically) returned directly
inside the HTML response; instead, we add `<script>` and `<link>` tags
in the `<head>` to direct the client to make additional requests to
load these resources.

For purposes of code organization, JS and CSS source is typically
split across many files. However, because web browsers are limited in
the number of requests that they can make in parallel, more files to
request means a slower user experience.

To solve this problem, the asset pipeline **concatenates** asset files
into fewer JS and CSS files. This reduces the number of requests that
a browser must make to render a web page. The asset pipeline also
**minifies** the JS and CSS assets, stripping out whitespace and
applying other optimizations (especially for JS) to reduce file-size.

The asset pipeline can also **pre-compile** higher-level languages
like CoffeeScript (to JavaScript) and Sass (to CSS). Some people like
CoffeeScript better than JavaScript; many people prefer Sass.

Rails defaults to concatenating all JavaScript files into one master
`application.js` file and all CSS files into one master
`application.css` file. As you'll learn later in this guide, you can
customize this strategy to group files any way you like.

## Writing manifest files

All your CSS and JavaScript sources, and images, should be placed in
the proper `app/assets` subdirectory: `images`, `javascripts`, or
`stylesheets`. Files in these directories will be handled by the asset
pipeline.

One of the key purposes of the asset pipeline is to group up and
concatenate source files. This reduces the number of requests the
client must make to the server. Manifest files describe how to group
source files. For instance, here is the default
`app/assets/javascripts/application.js`:

```javascript
// This is a manifest file that'll be compiled into application.js,
// which will include all the files listed below.
//
// Any JavaScript/Coffee file within:
//
// * app/assets/javascripts
// * lib/assets/javascripts
// * vendor/assets/javascripts
// * vendor/assets/javascripts of a Gem
//
// can be referenced here using a relative path.
//
//= require jquery
//= require jquery_ujs
//= require_tree .
```

This says that the compiled `application.js` file should concatenate
the jquery, jquery_ujs sources (provided by the `jquery-rails` gem),
plus also require all the javascript sources in the current tree
(`require_tree .`): any file in `app/assets/javascripts` or a
subdirectory. Effectively, that means *all* the javascript in the
application.

When writing JS manifests, the lines starting `//=` describe
dependencies.

Likewise, you may write CSS manifests like so:

```css
/*
 * This is a manifest file that'll be compiled into application.css,
 * which will include all the files listed below.
 *
 * Any CSS and SCSS file within this directory,
 * lib/assets/stylesheets, vendor/assets/stylesheets, or
 * vendor/assets/stylesheets of plugins, if any, can be referenced
 * here using a relative path.
 *
 *= require_tree .
 */
```

The default is to compile *all* the javascript code and *all* the css
code to two files: `application.js` and `application.css`. This is a
reasonable default: it means only two source files ever need to be
loaded across the whole site.

However, if we wanted more control we could change these manifests to
not include all the javascript or css (in particular, by removing the
`require_tree .` line). We could write additional manifests that
included some files but not others, and only the layouts/templates
that needed these bits would load them. You shouldn't do this right
now, but it's good to know about how the system works.

**TODO**: When working with Sass use `@import`, else they are compiled
in separate scopes and variables/mixins can't see each other.

## Compilation

When you deploy your application to Heroku environment, Heroku will
precompile your asset files to `public/assets` by running the `rake
assets:precompile` task.

The precompilation task involves:

0. compiling sources from CoffeeScript/Sass to JavaScript/CSS
0. concatenation of manifest files
0. final minification of the results.

The precompiled versions are then place in the `public/assets`
folder. When using the Rails asset tag helpers (see below), links
refer to this directory. The original sources in `app/assets` are
never served directly in the production environment.

In development, we don't compile the assets, because the minification
process makes it difficult to debug errors (because the code is made
illegible).

### Heroku

You should never need to precompile assets yourself; Heroku will do it
when you push your code to the server. Neither should you ever check
in compiled assets to the git repository: compiled assets are
unnecessary to track, since they are just the processed version of the
original source files, which **are** tracked in the repo.

Heroku used to have an annoying problem. When Heroku tried to compile
assets, students would encounter this error:

```
could not connect to server: Connection refused
Is the server running on host "127.0.0.1" and accepting
TCP/IP connections on port xxxx?
```

This is because, by default, Rails tries to connect to the database
when compiling assets. Heroku will now allow Rails to do this. To stop
Rails from connecting to the db during compilation, you can add:

    config.assets.initialize_on_precompile = false

to `config/application.rb`. This is fine, since I've never known an
application that needed to connect to the DB during compilation.

## Coding Links to Assets

The familiar asset tags will link to the precompiled versions of your
assets. You don't need to do anything special to use the asset
pipeline:

```erb
<%= stylesheet_link_tag "application" %>
<%= javascript_include_tag "application" %>
<%= image_tag "rails.png" %>
```

The `stylesheet_link_tag`/`javascript_include_tag`/`image_tag` helpers
will return links to the precompiled, concatenated, minified versions
in `public/assets` (not the originals in `app/assets`).

You should not hard-code links to `/assets/application.js` (or
`.css`). The names of precompiled assets contain an inserted
**fingerprint** which is not predictable. For instance, don't do this:

```html+erb
<head>
  <!-- noooo! -->
  <link href="/assets/application.css" type="text/css">
  <!-- yesss! -->
  <%= stylesheet_link_tag "application" %>
</head>
```

When `app/assets/stylesheets/application.css` is compiled, it is saved
to `public/assets/application-1bf77c05c1043f3a0467723f43f6cd7c.css` or
somesuch. These fingerprints are used for **cache control**, but we
won't discuss that in depth right now. You want to use the
finger-printed version, which is what `stylesheet_link_tag` will look
up for you: just give it the base.

## Server configuration

Eventually you will want to configure your web server to set
the expiration date of your CSS/JavaScript assets for far in the
future so that they are not rerequested by the client on every page
load. Likewise, you will want your server to serve compressed
(gzipped) versions of these files.

Do not worry about this for now. But later, in the back of your head,
remember that it involves configuring the web server, not Rails
itself.

## Resources

* http://railscasts.com/episodes/279-understanding-the-asset-pipeline?view=asciicast

