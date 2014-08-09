/// <reference path="../app.ts" />

var path = <NodeJS.Path> require('path');
var app = new TF.Application(path.join(__dirname, '..'));

app.configure(() => {
    // add declaration file
    app.addDeclaration('.build/app.d.ts');

    // load config
    app.config.addJson('app.json');

    // default routes
    app.router.map('/', { controller: 'Home', action: 'index' });
    app.router.map('/:controller/:action?/:id?', { action: 'index' });

    // REST routes
    app.router.get('/:controller/:id?', { action: 'find' });
    app.router.post('/:controller', { action: 'create' });
    app.router.put('/:controller/:id', { action: 'update' });
    app.router.delete('/:controller/:id', { action: 'destroy' });
});