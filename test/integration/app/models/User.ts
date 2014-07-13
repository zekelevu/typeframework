/// <reference path="../../app.ts" />

class User extends TF.Model {
    constructor(public name: string, public email: string, public age?: number) { super() }
}

User.validate('age', { required: false, min: 10 });
app.addModel(User);