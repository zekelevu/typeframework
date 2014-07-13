/// <reference path="../../app.ts" />

class UserController extends TF.Controller {
}

UserController.model = User;
app.addController(UserController);