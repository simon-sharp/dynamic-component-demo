## Installation

 - Install Node JS
 
 - Create a .netrc file in your Users home directory ~/.netrc and declare your git.tam.ch credentials
 
```
machine git.tam.ch
   login <username>
   password <password>
```

 - Install Angular CLI as Root (because its going into your Sytem and not the project)

`sudo npm i -g @angular/cli`

 - Install dependancies
 
 `npm i`

 - Run the test page

`ng serve`

 - Open test server
 
 `http://localhost:4200`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

Increase version number in package.json beforehand.

`ng build sso-dynamic --watch`

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Publish to npmjs.org

Go to the modules dist folder and type

`npm publish`

If necessary login to npm once

`npm login`
