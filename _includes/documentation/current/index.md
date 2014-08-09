# What is TypeFramework?

TypeFramework is web application framework that implements the model-view-controller (MVC) pattern
which runs via Node.js and TypeScript programming language. It is designed to assemble other MVC frameworks
like Ruby on Rails, CakePHP, ASP.NET MVC etc.. TypeFramework combines the performance of NodeJS platform together
with the power of TypeScript to give you a web framework that is fast and scalable.

TypeFramework does a few things different from other web frameworks:

## TypeScript

TypeScript is an amazing language that does a wonderful job of extending JavaScript. It is a strict superset of JavaScript
that adds static typing and and class-based OOP to the language. Because it is a superset, your existing JavaScript files
are already TypeScript which makes the transition to the language extremely easy.
You can learn more about it [here](http://www.typescriptlang.org).

## Node.js

Node.js allows JavaScript to run on server-side. It is designed to maximize performance using non-blocking I/O and asynchronous events.

## Express

TypeFramework controllers are really just Express middlewares. TypeFramework uses the Express v4 and supports the existing
ecosystem of Express middleware.

## REST Routing

TypeScript generates API for your models so you don't have to write any backend code to handle CRUD. It also generates default REST
for your models.