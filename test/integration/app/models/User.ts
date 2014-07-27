/// <reference path="../../app.ts" />

class User extends TF.Model {
    name: string;
    email: string;
    age: number;

    static configure() {
        this.validate('age', { required: false, min: 10 });
    }
}