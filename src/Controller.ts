/// <reference path="../TypeFramework.ts" />

module TF {
    export interface Request extends EX.Request {}
    export interface Response extends EX.Response {}

    export interface ActionFilterContext {
        request: Request;
        response: Response;
        next: () => void;
    }

    export class ActionFilter {
        // executed before action executed
        before: (context: ActionFilterContext) => any;

        private includeList: string[] = [];
        private excludeList: string[] = [];

        contains(action: string) {
            if (this.includeList.length > 0 && this.excludeList.length > 0)
                throw new Error('Action filter includes and excludes cannot be both specified!');

            if (this.includeList.length > 0 && !_.contains(this.includeList, action)) return false;
            if (this.excludeList.length > 0 && _.contains(this.excludeList, action)) return false;
            return true;
        }

        includes(...includes: string[]): ActionFilter {
            this.includeList.push.apply(this.includeList, includes);
            return this;
        }

        excludes(...excludes: string[]): ActionFilter {
            this.excludeList.push.apply(this.excludeList, excludes);
            return this;
        }
    }

    export class Controller {
        request: Request;
        response: Response;

        static filters: ActionFilter[];
        static model: any = null;

        constructor(req: Request, res: Response) {
            this.request = req;
            this.response = res;
        }

        static beforeAction(action: (context: ActionFilterContext) => any, ...ignores: string[]): ActionFilter {
            deprecate('Controller.beforeAction: Use Controller.addFilter instead');
            return this.addFilter(action);
        }

        static addFilter(action: (context: ActionFilterContext) => any, ...ignores: string[]): ActionFilter {
            var filter = new ActionFilter();
            filter.before = action;
            this.filters = this.filters || [];
            this.filters.push(filter);
            return filter;
        }
    }

    export class ModelController {
        constructor(public request: Request, public response: Response, public _model: any) {}

        find(id?: string) {
            if (!!id) {
                this._model.first({id: id}).done((err, model: Model) => {
                    if (!model) {
                        this.response.send(404, { error: 'not found' });
                        return;
                    }
                    this.response.send(model);
                });
                return;
            }

            this._model.find().where(this.request.query).done((err, model: Model) => {
                if (!model) {
                    this.response.send([]);
                    return;
                }
                this.response.send(model);
            });
        }

        create() {
            var model = new this._model();
            ModelController.bindModel(model, this.request);

            model.save((err) => {
                if (err) this.response.send(err);
                else this.response.send(model);
            })
        }

        update(id: string) {
            this._model.first({id: id}).done((err, model: Model) => {
                if (!model) {
                    this.response.send(404, { error: 'not found' });
                    return;
                }
                ModelController.bindModel(model, this.request);
                model.save((err) => this.response.send(model));
            });
        }

        destroy(id: string) {
            this._model.first({id: id}).done((err, model: Model) => {
                if (!model) {
                    this.response.send(404, { error: 'not found' });
                    return;
                }
                model.destroy((err) => this.response.send(model));
            });
        }

        private static bindModel(model: any, request: EX.Request) {
            for (var key in request.query)
                if (request.query.hasOwnProperty(key))
                    model[key] = request.query[key];

            for (var key in request.body)
                if (request.body.hasOwnProperty(key))
                    model[key] = request.body[key];
        }
    }
}