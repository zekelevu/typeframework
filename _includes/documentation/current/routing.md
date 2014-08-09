# Routing

TypeFramework routes are normally declared in Global.ts via `app.router`. When you generate a new app, these routes are generated
for you by default:

    // default routes
    app.router.map('/', { controller: 'Home', action: 'index' });
    app.router.map('/:controller/:action?/:id?', { action: 'index' });

The first route maps the application root path to action `index` in `Home` controller.

The second route is the catch all for all controller actions. For example, if you have a UserController with action `login`,
you can access the action using this url:

    http://localhost:3000/User/login

The `index` action was set as default, so you can access it by omitting the action param:

    http://localhost:3000/User

## CRUD and Actions

In TypeFramework, a resourceful route provides a mapping between HTTP verbs and URLs to controller actions.
By convention, each action also maps to particular CRUD operations in a database. To generate default CRUD actions
for your controller you just need to assign a Model to your controller:

    UserController.model = User;

These actions will be generated for your model controller:

- `find`: return a list of items
- `find(id)`: return the item with specified id
- `create`: create a item
- `update(id)`: update an existing item
- `destroy(id)`: delete an existing item

## Resourceful Routing

By default, TypeFramework also generates a REST routes for any controller with a model attached:

    // REST routes
    app.router.get('/:controller/:id?', { action: 'find' });
    app.router.post('/:controller', { action: 'create' });
    app.router.put('/:controller/:id', { action: 'update' });
    app.router.delete('/:controller/:id', { action: 'destroy' });
