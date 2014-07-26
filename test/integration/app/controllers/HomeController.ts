/// <reference path="../../app.ts" />

class HomeController extends TF.Controller {

    static configure() {
        this.beforeAction((context: TF.ActionFilterContext) => {
            if (context.request.param('filter') == 'filter1') context.response.send('filter1');
            else context.next();
        })
        .includes('actionWithBeforeFilter1', 'actionWithAllBeforeFilters');

        this.beforeAction((context: TF.ActionFilterContext) => {
            if (context.request.param('filter') == 'filter2') context.response.send('filter2');
            else context.next();
        })
        .includes('actionWithBeforeFilter2', 'actionWithAllBeforeFilters');

        this.beforeAction((context: TF.ActionFilterContext) => {
            if (context.request.param('filter') == 'filter3') context.response.send('filter3');
            else context.next();
        })
        .excludes('actionWithBeforeFilter1', 'actionWithBeforeFilter2', 'actionWithoutBeforeFilters');
    }

    index() {
        this.response.send('home');
    }

    number(id: number) {
        this.response.send(id + ':' + typeof id);
    }

    numberArray(id: number[]) {
        this.response.send(id + ':' + typeof id);
    }

    boolean(id: boolean) {
        this.response.send(id + ':' + typeof id);
    }

    booleanArray(id: boolean[]) {
        this.response.send(id + ':' + typeof id);
    }

    string(id: string) {
        this.response.send(id + ':' + typeof id);
    }

    stringArray(id: string[]) {
        this.response.send(id + ':' + typeof id);
    }

    any(id: any) {
        this.response.send(id + ':' + typeof id);
    }

    anyArray(id: any[]) {
        this.response.send(id + ':' + typeof id);
    }

    actionWithBeforeFilter1() {
        this.response.send('actionWithBeforeFilter1');
    }

    actionWithBeforeFilter2() {
        this.response.send('actionWithBeforeFilter2');
    }

    actionWithBeforeFilter3() {
        this.response.send('actionWithBeforeFilter3');
    }

    actionWithAllBeforeFilters() {
        this.response.send('actionWithoutBeforeFilters');
    }

    actionWithoutBeforeFilters() {
        this.response.send('actionWithoutBeforeFilters');
    }

    private privateFunction() {
        this.response.send('private');
    }

    static staticFunction() {}

}

app.addController(HomeController);