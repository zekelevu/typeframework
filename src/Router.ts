/// <reference path="../TypeFramework.ts" />

module TF {
    export interface Route {
        path: string;
        methods: string[];
        defaults: RouteData;
    }

    export interface RouteData {
        controller?: string;
        action?: string;
        id?: string;
    }

    export class Router {
        public routes: Route[] = [];

        get(path: string, data: RouteData = {}) {
            this.map(path, data, ['GET']);
        }

        post(path: string, data: RouteData = {}) {
            this.map(path, data, ['POST']);
        }

        put(path: string, data: RouteData = {}) {
            this.map(path, data, ['PUT']);
        }

        delete(path: string, data: RouteData = {}) {
            this.map(path, data, ['DELETE']);
        }

        map(path, defaults: RouteData = {}, methods: string[] = ['GET', 'POST', 'PUT', 'DELETE']) {
            this.routes.push({ path: path, methods: methods, defaults: defaults});
        }
    }
}