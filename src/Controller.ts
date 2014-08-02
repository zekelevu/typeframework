/// <reference path="TypeFramework.ts" />

module TF {
    export interface IActionResult {
        execute(Application, Response): void;
    }

    export class RedirectResult implements IActionResult {
        constructor(public url: string, public status: number = 302) {}
        execute(app: Application, response: Response) {
            response.express.redirect(this.status, this.url);
        }
    }

    export class ContentResult implements IActionResult {
        constructor(public content: string) {}
        execute(app: Application, response: Response) {
            response.express.send(this.content);
        }
    }

    export class JsonResult implements IActionResult {
        constructor(public data: {}) {}
        execute(app: Application, response: Response) {
            response.express.json(this.data);
        }
    }

    export class FileResult implements IActionResult {
        constructor(public path: string) {}
        execute(app: Application, response: Response) {
            var file = path.resolve(app.root + '/' + this.path);
            response.express.sendfile(file);
        }
    }

    export class DownloadResult implements IActionResult {
        constructor(public path: string, public filename?: string) {}
        execute(app: Application, response: Response) {
            var file = path.resolve(app.root + '/' + this.path);
            response.express.attachment(file);
            response.express.sendfile(file, this.filename);
        }
    }

    export class ViewResult implements IActionResult {
        constructor(public template: string, public options?: {}) {}
        execute(app: Application, response: Response) {
            response.express.render(this.template, this.options);
        }
    }

    export interface IFilterAction {
        (context: IActionFilterContext): void;
    }

    export interface IActionFilterContext {
        request: Request;
        response: Response;
        send: (IActionResult) => void;
        next: () => void;
        result?: IActionResult;
    }

    export interface IActionFilter {
        before?(context: IActionFilterContext): void;
        after?(context: IActionFilterContext): void;
    }

    export class ActionFilter implements IActionFilter {
        private includeList: string[] = [];
        private excludeList: string[] = [];

        contains(action: string) {
            if (this.includeList.length > 0 && this.excludeList.length > 0)
                throw new Error('Action filter includes and excludes cannot be both specified!');

            if (this.includeList.length > 0 && !_.contains(this.includeList, action)) return false;
            if (this.excludeList.length > 0 && _.contains(this.excludeList, action)) return false;
            return true;
        }

        only(...includes: string[]): ActionFilter {
            this.includeList.push.apply(this.includeList, includes);
            return this;
        }

        except(...excludes: string[]): ActionFilter {
            this.excludeList.push.apply(this.excludeList, excludes);
            return this;
        }
    }

    export class Controller {
        request: Request;
        response: Response;
        send: (IActionResult) => void;

        static filters: any[];
        static model: any = null;

        constructor(request: Request, response: Response, send: (IActionResult) => void) {
            this.request = request;
            this.response = response;
            this.send = send;
        }

        redirect(url: string, status: number = 302) {
            this.send(new RedirectResult(url, status));
        }

        content(text: string, contentType?: string) {
            if (contentType) this.response.contentType(contentType);
            this.send(new ContentResult(text));
        }

        json(data: {}) {
            this.send(new JsonResult(data));
        }

        file(path: string) {
            this.send(new FileResult(path));
        }

        download(path: string, filename?: string) {
            this.send(new DownloadResult(path, filename));
        }

        view(template: string, options?: {}) {
            var result = new ViewResult(template);
            if (options) result.options = options;
            this.send(result);
        }

        static addBeforeFilter(action: IFilterAction): ActionFilter {
            var filter = new ActionFilter();
            filter['before'] = action;
            this.filters = this.filters || [];
            this.filters.push(filter);
            return filter;
        }

        static addAfterFilter(action: IFilterAction): ActionFilter {
            var filter = new ActionFilter();
            filter['after'] = action;
            this.filters = this.filters || [];
            this.filters.push(filter);
            return filter;
        }

        static addFilter(filterType: any): ActionFilter {
            var filter = new filterType();
            this.filters = this.filters || [];
            this.filters.push(filter);
            return filter;
        }
    }

    export class ModelController extends Controller {
        constructor(request: Request, response: Response, send: (IActionResult) => void, public _model: any) {
            super(request, response, send);
        }

        find(id?: string) {
            if (!!id) {
                this._model.first({id: id}).done((err, model: Model) => {
                    if (!model) {
                        this.response.status(404);
                        this.json({ error: 'not found' });
                        return;
                    }
                    this.json(model);
                });
                return;
            }

            this._model.find().where(this.request.query).done((err, model: Model) => {
                if (!model) {
                    this.json([]);
                    return;
                }
                this.json(model);
            });
        }

        create() {
            var model = new this._model();
            ModelController.bindModel(model, this.request);

            model.save((err) => {
                if (err) this.json(err);
                else this.json(model);
            })
        }

        update(id: string) {
            this._model.first({id: id}).done((err, model: Model) => {
                if (!model) {
                    this.response.status(404);
                    this.json({ error: 'not found' });
                    return;
                }
                ModelController.bindModel(model, this.request);
                model.save((err) => this.json(model));
            });
        }

        destroy(id: string) {
            this._model.first({id: id}).done((err, model: Model) => {
                if (!model) {
                    this.response.status(404);
                    this.json({ error: 'not found' });
                    return;
                }
                model.destroy((err) => this.json(model));
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