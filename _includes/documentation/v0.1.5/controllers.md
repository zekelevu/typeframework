# Controllers

Controllers are defined in the `/app/controllers/` folder. Creating a new controller is easy, all you need to do is extend the TF.Controller. The following controller defines a single action
named `index` that returns 'Hello world':

    class HomeController extends TF.Controller {

        index() {
            this.response.send('Hello world!');
        }

    }

    app.addController(HomeController);

## Parameters

You can also pass parameters into action and TypeFramework will automatically convert data into correct type for you:

    hello(name: string) {
        this.response.send('Hello: ' + name);
    }

If your visit the action with `/hello?name=John` for example, the action will render 'Hello John'. The parameter doesn't have to be
a query string, it could be any of these in this order:

- Routing parameters (see [Routing](routing.html) for learn more about routing parameters)
- Request body
- Query string

## Request Object

Each controller that inherits the TF.Controller will have access to the Request object via `this.request`.
You can use the request object to query information about the user request.

- `request.param()`: get query string, routing params or POST data...
- `request.query`: returns query string data.
- `request.cookies`: returns cookie data.
- `request.get()`: get the case-insensitive request header field.
- `request.host`: returns the hostname from the "Host" header field.

The TypeFramework request object extends Express Request object. You can check out the [Express guide](http://expressjs.com/4x/api.html) for more information.

## Resonse Object

Each controller that inherits the TF.Controller will have access to the Response object via `this.response`.
You can use the response object to send data back to user.

### response.render

- this.response.render(view, callback)
- this.response.render(view, data, callback)

Render a view using ejs template engine:

    this.response.render('index', { user: name });

### response.json

- this.response.json(body)
- this.response.json(status, body)

Send a JSON response:

    this.response.json({ user: name });
    this.response.json(500, { error: message });

### response.send

- this.response.send(body)
- this.response.send(status, body)

From the [Express guide](http://expressjs.com/4x/api.html). This method is useful for sending any non-streaming responses.
The following usages are all valid:

this.response.send({ some: 'json' });
this.response.send('some html');
this.response.send(404, 'Sorry, we cannot find that!');
this.response.send(500, { error: 'something blew up' });
this.response.send(200);

### response.redirect

- this.response.redirect(url)
- this.response.redirect(status, url)

From the [Express guide](http://expressjs.com/4x/api.html).
Redirect to the given url with optional status code defaulting to 302 "Found":

    this.response.redirect('/foo/bar');
    this.response.redirect('http://example.com');
    this.response.redirect(301, 'http://example.com');
    this.response.redirect('../login');


The TypeFramework response object extends Express Response object.
You can check out the [Express guide](http://expressjs.com/4x/api.html) for more information.

## Action Filters

Action filters are method that run before a controller action

Filters may halt the request cycle. A common filter is one which requires that a user is logged in for an action to be run.
You can define the filter method this way:

    UserController.beforeAction((context: TF.ActionFilterContext) => {
        var isAuthenticated = ...;
        if (!isAuthenticated)
            context.response.redirect('/login');
        else
            context.next();
    });

Action filters by default will be applied to all actions, but your can also exclude some actions:

    UserController.beforeAction(...).excludes('login');

You can also choose to apply filter to a certain actions and exclude the rest:

    UserController.beforeAction(...).includes('index', 'login');
