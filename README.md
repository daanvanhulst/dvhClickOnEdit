# dvh-ng-boilerplate-lt

## About the module
Boilerplate for Angular written in TypeScript for quick module development. The module is made because I
love developing with TypeScript, and I kept running into the issue of having to include modules in my main project
so they could be run through the old build system. I want to keep my modules as stand alone as possible, and creating 
own .git repositories for that helps. My goal for this side-project is that I (and maybe other people) will be able
to clone this repo, run the install.bat and enter some information into the console which will then set everything up 
fully automated. 

## Getting started
Start by cloning the repository. The automatic installation will do the exact same things as the manual installation.
Some steps are not included yet (renaming of stuff), so this still has to be done manually.

I assume that you have Node.js installed. And also done:
npm install -g bower
npm install -g karma
npm install -g gulp
npm install -g tsd

### Automatic installation:

Run install.bat from CMD (only windows atm)

### Manual installation:

npm install
bower install
tsd reinstall -s

### commands:

gulp        //Will do a build and then watch the files for changes. Re-compile and re-run unit tests
gulp build  //Just compiles everything
gulp watch  //Will watch files for changes and compile the appropriate files (for when you don't want unit tests to run)

## Build system

The first steps have been taken; there is a build system. For now it is still needed to change the package.json and bower.json
information manually. Same as the main folder and main module name.

The build is made with Gulp and includes:

Compilation and minification of TypeScript to JavaScript
Compilation and minification of HTML to JS
Compilation and minification of LESS to CSS
Automatic API documentation generation with ngDocs
Automatic .tsd reference file generatino with all TypeScript files
Karma server with Jasmine for unit testing

### Build output

The name in the package.json is used for the names of the files. The build outputs the following files:

<name>.min.js   //Generated from all .ts files
<name>.tpl.js   //Generated from all .html files
<name>.min.css  //Generated from all .less files

## Configuration files

package.json   //Used to install npm modules
bower.json     //Used to install third party libraries (Angular, etc)
tsd.json       //Used to install TypeScript defintions for third party libraries.

## Unit testing
It has Karma with Jasmine for creating unit tests. I haven't figured out yet how to write unit tests in TypeScript.
The preprocessor that I use does not seem to like this, so I am sticking with .js.spec files for now for unit tests.
