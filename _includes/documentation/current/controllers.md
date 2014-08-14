# Controllers

Controllers are defined in the `/app/controllers/` folder. Creating a new controller is easy, all you need to do is extend the TF.Controller. The following controller defines a single action
named `index` that returns 'Hello world':

    class HomeController extends TF.Controller {
        index() {
            this.content('Hello world!');
        }
    }

## Action Parameters

You can also pass parameters into action and TypeFramework will automatically convert data into correct type for you:

    class HomeController extends TF.Controller {
        hello(name: string) {
            this.content('Hello: ' + name);
        }
    }

If your visit the action with `/hello?name=John` for example, the action will render 'Hello John'. The parameter doesn't have to be
a query string, it could be any of these in this order:

- Routing parameters (see [Routing](#routing) for learn more about routing parameters)
- Request body
- Query string

## Reply Interface

Every controller in TypeFramework inherits the Reply interface which is implemented in the base controller. This interface is
mainly used for sending data back to user.

### Send a text response

    this.content(text: string);
    this.content(text: string, contentType: string);

### Send a JSON response

    this.json(data: {});

### Render a view

    this.view(template: string);
    this.view(template: string, options: {});

### Send a response from file

    this.file(path: string);

### Download a file

    this.download(path: string);
    this.download(path: string, filename: string);

### Redirect to a url

Redirect to the given url with optional status code defaulting to 302 "Found":

    this.redirect(url: string);
    this.redirect(url: string, status: number);

## Request Object

Each controller that inherits the TF.Controller will have access to the Request object via `this.request`.
You can use the request object to query information about the user request.

- `request.param()`: get query string, routing params or POST data...
- `request.query`: returns query string data.
- `request.cookies`: returns cookie data.
- `request.get()`: get the case-insensitive request header field.
- `request.host`: returns the hostname from the "Host" header field.

The TypeFramework request object extends Express Request object. You can check out the [Express guide](http://expressjs.com/4x/api.html) for more information.

## Response Object

Each controller that inherits the TF.Controller will have access to the Response object via `this.response`.
You can use the response object to send data back to user.

### Get or set response status:

    this.response.setStatus(404);
    this.response.getStatus();

### Get or set response header:

    this.response.setHeader('Content-Type', 'text/plain');
    this.response.getHeader('Content-Type');

### Set or remove a cookie

    this.response.setCookie('name', 'john', { domain: '.example.com', path: '/admin', secure: true });
    this.response.removeCookie('name');
    this.response.removeCookie('name', '/admin');

### Set response content type:

    this.response.setContentType('text/plain');

### Set response Link header field

Join the given links to populate the "Link" response header field:

    this.response.setLinks({
        next: 'http://api.example.com/users?page=2',
        last: 'http://api.example.com/users?page=5'
    });

### Get or set local data

Response local data are scoped to the request and will be exposed to the views:

    this.response.setLocal('name': 'John');

## Action Filters

Action filters are method that run before, after or around a controller action.

Filters may halt the request cycle. A common filter is one which requires that a user is logged in for an action to be run.
You can add a filter to a controller this way by passing a function that accepts TF.ActionFilterContext as a parameter:

    class UserController extends TF.Controller {
        static configure() {
            this.addBeforeFilter(this.authenticate);
        }

        static authenticate(context: TF.ActionFilterContext) {
            var isAuthenticated = ...;
            if (!isAuthenticated)
                context.reply.redirect('/login');
            else
                context.next();
        }
    }

Alternatively you can also create a class that extends TF.ActionFilter. The advantage of doing this is that you can have both
`before` and `after` filters in the same class which will create a `around` filter:

    class SpeedLogger extends TF.ActionFilter {
        private start: number;

        before(context: TF.IActionFilterContext) {
            this.start = new Date().getTime();
            context.next();
        }

        after(context: TF.IActionFilterContext) {
            var elapse = new Date().getTime() - this.start;
            ...
            context.next();
        }
    }

    class UserController extends TF.Controller {
        static configure() {
            this.addFilter(SpeedLogger);
        }
    }

Action filters by default will be applied to all actions, but your can also exclude some actions:

    this.addFilter(...).except('login');

You can also choose to apply filter to a certain actions and exclude the rest:

    this.addFilter(...).only('index', 'login');
