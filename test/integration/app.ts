/// <EXTERNAL REFERENCES>
/// <reference path="../../build/TypeFramework.d.ts" />

/// <HELPER REFERENCES>
/// <reference path="app/Global.ts" />

/// <MODEL REFERENCES>
/// <reference path="app/models/User.ts" />

/// <CONTROLLER REFERENCES>
/// <reference path="app/controllers/HomeController.ts" />
/// <reference path="app/controllers/UserController.ts" />

app.addModel(User);
app.addController(HomeController);
app.addController(UserController);

app.start();