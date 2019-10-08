# Parcel plugin for MJML

A [`parcel`](https://parceljs.org/)-plugin to enable the use of
[`mjml`](https://mjml.io)-templates in your project.

## Usage

After you [installed](#installation) the plugin `parcel` will use it
automatically on any file ending with `.mjml`.

You could either use an `mjml`-template as the entry point:

```sh
parcel src/template.mjml
```

Or you could use it as a dependency in another file, e.g. a standard
`html`-file:

_index.html:_

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>App</title>
  </head>
  <body>
    <a href="./template.mjml">See my awesome mjml template</a>
  </body>
</html>
```

## Importing dependencies inside your templates

`mjml` has [its own module system](https://mjml.io/documentation/#mj-include)
where you can include other templates, or components into your base template,
and this will work as expected with this plugin:

```html
<mj-include path="./includes/button.mjml" />
```

If you want to include css (or javascript – even though that would probably not
work very well in an email) you have to wrap the import in `<mj-raw>`:

```html
<mj-head>
  <mj-raw>
    <link rel="stylesheet" href="./app.scss" />
  </mj-raw>
</mj-head>
```

But for the css to work better in html I recommend that you also use something
like [`parcel-plugin-inliner`](https://github.com/shff/parcel-plugin-inliner) to
inline the css into your generated html.

## Installation

```sh
npm i -D parcel-plugin-mjml
# or
yarn add --dev parcel-plugin-mjml
```

Any module named `parcel-plugin-*` present in your `package.json` will be used
automatically by Parcel. So after the installation step you are good to go.

## Configuration

`mjml` can, to some extent, be configured using an `.mjmlconfig` file located in
the root of you project.
[Read more in the mjml documentation](https://mjml.io/documentation/#community-components).

## License

MIT (c) Adam Bergman 2019
