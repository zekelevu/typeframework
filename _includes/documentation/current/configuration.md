# Configuration

TypeFrame configuration settings are defined in `app.json` in JSON format:

    {
        "port": 3000,
        "logging": {
            "format": "dev"
        }
    }

To retrieve specified setting declared in `app.json`, use `app.config.get`.
The following code would retrieve the value of the default adapter module name shown earlier in app.json:

    app.config.get('adapters.default.module');

## General Configuration

- `env` (string): returns Node.js environment variable which defaults to `development`.
- `port` (number): the port number your app will be listening on, defaults to `3000`.
- `assetPath` (string): the path to the public folder, defaults to `public`.
- `view.path` (string): the path to the views folder, defaults to `app/views`.
- `view.engine` (string): the view engine, defaults to `ejs`.
- `view.layout` (string, boolean): the default layout to be used for templates, defaults to `false`.
- `logging.format` (string): whether app should log all request to console. Available options:
    - `default`: standard output.
    - `short`: shorter than default, also including response time.
    - `tiny`: the minimal.
    - `dev`: concise output colored by response status for development use.

## Adapter Configuration

You can declare as many adapters as you need in `adapters` setting. The following config declares a `default` adapter using
module `sails-disk`:

    {
        "adapters": {
            "default": {
                "module": "sails-disk",
                "schema": true,
                "filePath": ".build/database.json"
            }
        }
    }
