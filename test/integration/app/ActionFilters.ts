/// <reference path="../app.ts" />

class ActionFilter1 extends TF.ActionFilter {

    before(context: TF.IActionFilterContext) {
        if (context.request.param('filter') == 'filter1') context.reply.content('filter1');
        else context.next();
    }

    after(context: TF.IActionFilterContext) {
        context.next();
    }

}

class ActionFilter2 extends TF.ActionFilter {

    before(context: TF.IActionFilterContext) {
        if (context.request.param('filter') == 'filter2') context.reply.content('filter2');
        else context.next();
    }

}