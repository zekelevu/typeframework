/// <reference path="../../app.ts" />

class HomeController extends TF.Controller {

    static configure() {
        this.addFilter(ActionFilter1).only('actionWithBeforeFilter1', 'actionWithAllBeforeFilters');
        this.addFilter(ActionFilter2).only('actionWithBeforeFilter2', 'actionWithAllBeforeFilters');
        this.addBeforeFilter(this.filter3).except('actionWithBeforeFilter1', 'actionWithBeforeFilter2', 'actionWithoutBeforeFilters');
    }

    static filter3(context: TF.IActionFilterContext) {
        if (context.request.param('filter') == 'filter3') context.reply.content('filter3');
        else context.next();
    }

    index() {
        this.content('home');
    }

    number(id: number) {
        this.content(id + ':' + typeof id);
    }

    numberArray(id: number[]) {
        this.content(id + ':' + typeof id);
    }

    boolean(id: boolean) {
        this.content(id + ':' + typeof id);
    }

    booleanArray(id: boolean[]) {
        this.content(id + ':' + typeof id);
    }

    string(id: string) {
        this.content(id + ':' + typeof id);
    }

    stringArray(id: string[]) {
        this.content(id + ':' + typeof id);
    }

    any(id: any) {
        this.content(id + ':' + typeof id);
    }

    anyArray(id: any[]) {
        this.content(id + ':' + typeof id);
    }

    actionWithBeforeFilter1() {
        this.content('actionWithBeforeFilter1');
    }

    actionWithBeforeFilter2() {
        this.content('actionWithBeforeFilter2');
    }

    actionWithBeforeFilter3() {
        this.content('actionWithBeforeFilter3');
    }

    actionWithAllBeforeFilters() {
        this.content('actionWithoutBeforeFilters');
    }

    actionWithoutBeforeFilters() {
        this.content('actionWithoutBeforeFilters');
    }

    redirectToHome() {
        this.redirect('/');
    }

    redirectToHomePermanently() {
        this.redirect('/', 301);
    }

    fileContent() {
        this.file('app.json');
    }

    downloadFile() {
        this.download('app.json');
    }

    viewWithLayout() {
        this.view('viewWithLayout', { layout: 'layout', message: 'view' });
    }

    viewWithoutLayout() {
        this.view('viewWithoutLayout', { message: 'viewWithoutLayout' });
    }

    customHeader() {
        this.response.setHeader('custom-header', 'test');
        this.content('');
    }

    private privateFunction() {
        this.content('private');
    }

    static staticFunction() {}

}