/// <reference path="TypeFramework.ts" />

module TF {
    export class Response {
        constructor(public express: EX.Response) {}

        status(code: number): Response {
            this.express.status(code);
            return this;
        }

        contentType(value: string): Response {
            this.express.type(value);
            return this;
        }

        header(field: string, value: string): Response {
            this.express.header(field, value);
            return this;
        }
    }
}