/// <reference path="TypeFramework.ts" />

module TF {
    export class Response {
        constructor(public express: EX.Response) {}

        setStatus(code: number): Response {
            this.express.status(code);
            return this;
        }

        getStatus(): number {
            return this.express.statusCode;
        }

        setHeader(field: string, value: string): Response {
            this.express.header(field, value);
            return this;
        }

        getHeader(field: string): string {
            return this.express.get(field);
        }

        setCookie(name: string, value: string, options?: ICookieOption): Response {
            this.express.cookie(name, value, options);
            return this;
        }

        removeCookie(name: string, path: string = '/'): Response {
            this.express.clearCookie(name, { path: path });
            return this;
        }

        setContentType(value: string): Response {
            this.express.type(value);
            return this;
        }

        setLinks(links: {}): Response {
            this.express.links(links);
            return this;
        }

        setLocal(name: string, value: any): Response {
            this.express.locals[name] = value;
            return this;
        }

        getLocal(name: string): any {
            return this.express.locals[name];
        }
    }
}