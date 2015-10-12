### Asset links within CSS and JavaScript sources

You must always avoid hard-coding links to assets; in view templates
this was easy because you just used the standard asset tag
helpers. Inside CSS/Sass and JavaScript/CoffeeScript, you need to also
be careful to not use hard-coded link to assets.

#### JavaScript/CoffeeScript and ERB

**TODO**: `asset_path` vs `image_path`, `image-url` vs `asset-url`?

The easiest way to avoid hard-coded asset links is to use embedded
ruby with your JS/CoffeeScript sources. If you add an `erb` extension
to a JavaScript asset, making it, for instance, `application.js.erb`,
then you can use the typical helpers in your JavaScript code:

```js
$('#logo').attr(:src => "<%= asset_path('logo.png') %>");
```

When the ERB file is compiled to pure JS, the `asset_path` will be
replaced with a proper link to the `public/assets` directory.

#### CSS and Sass

When using the asset pipeline, paths to assets must use `image-url`
helper (**confusing**: note the hyphen, which is different in Sass
than Ruby) for the following asset classes: image, font, video, audio,
JavaScript and stylesheet. So to set a background image in Sass:

```scss
.body {
  background-image: image-url("rails.png");
}
```
