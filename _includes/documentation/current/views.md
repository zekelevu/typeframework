# View Engine

TypeFramework uses [EJS](http://embeddedjs.com) for its view engine. To render a view you would use `response.render` in your controller action:

    index(name: string) {
        this.response.render('index', { user: name });
    }

Render view with a layout:

    this.response.render('index', { layout: 'my_layout' });

## Structuring Layouts

When TypeFramework renders a view as a response, it does so by combining the view with the current layout.
Within a layout, you have access to these tools for combining different bits of output to form the overall response:

- Body
- Section & contentFor
- Partials


### Body

A layout should always contains a `<%- body %>` which is where your view template will be rendered:

A view:

    <h1>Hello world!</h1>

With a layout:

    <html>
        <head>
            <title></title>
        </head>
        <body>
            <%- body %>
        </body>
    <html>

### Sections & contentFor

You can declare multiple sections in a layout and implement them in a view.

A view:

    <h1>Hello world!</h1>

    <%- contentFor('header') %>
    <style>...</style>

    <%- contentFor('footer') %>
    <script>...</script>

With a layout:

    <html>
        <head>
            <title></title>
            <%- header %>
        </head>
        <body>
            <%- body %>

            <footer>
                <%- footer %>
            </footer>
        </body>
    <html>

#### Optional section:

By default a section declared in a layout must be implemented in a view, an error will be throw otherwise.
You can make a section optional using `defineContent`:

    <html>
        <head>
            <title></title>
            <%- defineContent('header') %>
        </head>
        <body>
            <%- body %>
        </body>
    <html>

### Partials

Partial templates - or just "partials" - are another way of for breaking the rendering process into more manageable chunks.
With a partial you can put a certain piece of popular code to its own file. Partials are being called using `include` and
can be inserted into both layouts and views:

    <html>
        <head>
            <title></title>
        </head>
        <body>
            <%- include my_partial.ejs %>
            <%- body %>
        </body>
    <html>

For more information EJS template syntax, please see [EJS documentation](http://embeddedjs.com/getting_started.html).