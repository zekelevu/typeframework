# Models

TypeFramework uses Waterline ORM (created by Sails.js). Waterline allows developers to interact with models the same way regardless of
data source they're using.

Models are defined in the `/app/models/` folder .To create a model, just extends TF.Model.
The following User model defines 3 attributes `name`, `email` and  `age`:

    class User extends TF.Model {
        name: string;
        email: string;
        age: number;
    }

    app.addModel(User);

You can also specify model attributes in constructor:

    class User extends TF.Model {
        constructor(public name: string, public email: string, public age?: number) {
            super()
        }
    }

    app.addModel(User);

By default all attributes are required unless it has the `?` in the end to mark that it optional.
Model attributes can also be validated like so:

    User.validate('age', { required: false, min: 18 });

Available validations:

`empty`, `required`, `notEmpty`, `undefined`, `string`, `alpha`, `numeric`, `alphanumeric`, `email`, `url`,
`urlish`, `ip`, `ipv4`, `ipv6`, `creditcard`, `uuid`, `uuidv3`, `uuidv4`, `int`, `integer`, `number`, `finite`,
`decimal`, `float`, `falsey`, `truthy`, `null`, `notNull`, `boolean`, `array`, `date`, `hexadecimal`, `hexColor`,
`lowercase`, `uppercase`, `after`, `before`, `is`, `regex`, `not`, `notRegex`, `equals`, `contains`, `notContains`,
`len`, `in`, `notIn`, `max`, `min`, `minLength`, `maxLength`,

Check out the [Waterline documentation](https://github.com/balderdashy/waterline) for more information.

## Save a Model

    var user = new User('John', 'john@test.com');
    user.save((err) => {
        // callback
    });

## Update a Model

Find user with id `1` and update name to 'John Doe':

    User.get(1).done((err, user: User) => {
        user.name = 'John Doe';
        user.save((err) => {
            // callback
        });
    });

## Destroy a Model

Find user with id `1` and delete model:

    User.get(1).done((err, user: User) => {
        user.name = 'John Doe';
        user.destroy((err) => {
            // callback
        });
    });

## Query Models

Lookup a model by id:

    User.get(1).done((err, user: User) => { /* callback */ });

Lookup a model by other attributes:

    User.first({ name: 'John' }).done((err, user: User) => { /* callback */ });

Get a list of users with name 'John':

    User.find()
        .where({ name: 'John' })
        .done((err, users: User[]) => { /* callback */ });

Get 5 users with name 'John' and ignore the first 10:

    User.find()
        .where({ name: 'John' })
        .skip(10)
        .limit(5)
        .done((err, users: User[]) => { /* callback */ });