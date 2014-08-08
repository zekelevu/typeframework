/// <reference path="TypeFramework.ts" />

module TF {
    export class Reply {
        constructor(public send: (IActionResult) => void) {}

        redirect(url: string, status: number = 302) {
            this.send(new RedirectResult(url, status));
        }

        content(text: string, contentType?: string) {
            this.send(new ContentResult(text, contentType));
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
    }
}