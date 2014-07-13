/// <reference path="../app.ts" />

declare var require: NodeJS.Require;

var app = new TF.Application(__dirname + '/../', __dirname + '/app.d.ts');
app.configure(() => {
    // load config
    app.config.addJson(app.root + 'app.json');

    // default routes
    app.router.map('/', { controller: 'Home', action: 'index', name: 'zeke' });
    app.router.map('/:controller/:action?/:id?', { action: 'index' });

    // REST routes
    app.router.get('/:controller/:id?', { action: 'find' });
    app.router.post('/:controller', { action: 'create' });
    app.router.put('/:controller/:id', { action: 'update' });
    app.router.delete('/:controller/:id', { action: 'destroy' });
});