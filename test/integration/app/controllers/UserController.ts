/// <reference path="../../app.ts" />

class UserController extends TF.Controller {

    static configure() {
        this.model = User;
    }

}

app.addController(UserController);