Choices
=======

# Purpose of this file
In this file I will explain the rationale of choosing certain technologies/frameworks/libraries.

# Programming Language
I choose to write this url shortener in TypeScript. I am quite experienced with this language, it will help me 
structure the code in Classes and provide static type checking to prevent bugs. These advantages should outweigh the
overhead of the compile step plus the extra work of getting type definitions for all used dependencies.

# Platform
TypeScript/JavaScript leave little choice with regards to a backend platform: NodeJS.

# API Framework
Because the challenge asks for the implementation of a Restful API I pick the Restify NodeJS module to reduce the 
boilerplate and aid in structuring the code.

# Unit Testing
Unit tests will be written that directly test the public methods of the TypeScript classes.

## Framework & Assertion Library
Jasmine, because I am most familiar with this framework and assertion library.

## Test runners
- WallabyJS, used for development because it gives instant feedback
- Karma, to allow CI and people without WallabyJS installed to run the tests

# E2E Testing
## Framework & Test Runner
Mocha because this is the most used framework and test runner for NodeJS E2E testing.

## Assertion Library
Chai because it is most similar to Jasmine assertions which i'm familiar with.