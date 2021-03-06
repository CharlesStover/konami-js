# Konami.js [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=↑↑↓↓←→←→🅱🅰,%20now%20in%20JavaScript%20event%20listener%20form&url=https://github.com/GamingMedley/konami.js&via=CharlesStover&hashtags=javascript,webdev,webdeveloper,webdevelopment)

Konami.js is a JavaScript package that allows web developers to implement an event listener for the Konami code on their web pages. By pressing up, up, down, down, left, right, left, right, B, A, Enter, one or more custom JavaScript functions will execute.

[![package](https://img.shields.io/npm/v/@gamingmedley/konami.js.svg)](https://www.npmjs.com/package/@gamingmedley/konami.js)
[![minified size](https://img.shields.io/bundlephobia/min/@gamingmedley/konami.js.svg)](https://www.npmjs.com/package/@gamingmedley/konami.js)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/@gamingmedley/konami.js.svg)](https://www.npmjs.com/package/@gamingmedley/konami.js)
[![downloads](https://img.shields.io/npm/dt/@gamingmedley/konami.js.svg)](https://www.npmjs.com/package/@gamingmedley/konami.js)
[![build](https://travis-ci.com/GamingMedley/konami.js.svg)](https://travis-ci.com/GamingMedley/konami.js)

## Examples

### ES6

#### Install

* `npm install @gamingmedley/konami.js --save` or
* `yarn add @gamingmedley/konami.js`

#### Adding an Event Listener

```JS
import Konami from '@gamingmedley/konami.js';
Konami.add(() => {
  alert('This will alert every time the Konami code is entered.');
});
```

#### Adding a Single-Execution Event Listener

```JS
import Konami from '@gamingmedley/konami.js';
Konami.add((unsubscribe) => {
  unsubscribe(); // Unsubscribes the listener from future Konami code entries.
  alert('This will only alert the first time the Konami code is entered.');
});
```

#### Removing an Event Listener

```JS
import Konami from '@gamingmedley/konami.js';
const unsubscribe = Konami.add(() => {
  alert('This will not alert, because it will have been removed.');
});
unsubscribe();
```

## Methods

### add

Queues a function to be executed when the Konami code is entered by the user.

Returns an unsubscribe function. When executed, the unsubscribe function will disable the associated function from executing in future uses of the Konami code.

#### Parameters

* `function e`: The function to be executed when the Konami code is entered by the user. An unsubscribe function is passed as a parameter to it.

### remove

The function associated with the ID will no longer execute when the Konami code is entered.

Returns `true` on success, `false` on failure.

#### Parameters

* `string id`: The ID of the event to remove.
