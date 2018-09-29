
[![Build Status](https://travis-ci.org/hand-dot/wkn.svg?branch=master)](https://travis-ci.org/hand-dot/wkn)

![cooltext297452362996449](https://user-images.githubusercontent.com/24843808/45003797-faebce80-b020-11e8-95c8-021c2caf9e4f.gif)

wkn is easy possible to run the processing to another thread.
  

# Concept

* Simple API
* No Config
* Light

# Installing
`$ npm install wkn`

# Example
```javascript  
import wkn from 'wkn';

/**
* Takes function and arguments, moves the processing to another thread,
* and receives the processing result on Promise.
* @param {Function} function to have retunrn value. (Be processed in Web Worker context)
* @param  {...*}  [arguments] arguments
* @returns  {Promise} Returns Processing result as Promise
*/

// Simple usage
wkn(arg => arg + 1, 100)
  .then((value) => {
    console.log(value); // 101
  });

// Two arguments
wkn((arg1, arg2) => `${arg1}!${arg2}!`, 'hoge', 'foo')
  .then((value) => {
    console.log(value); // hoge!foo!
  });

// Use moment.js
wkn((years, months, days, hours, minutes, seconds) => {
  importScripts('https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/moment.js');
  const m = moment(new Date(years, months, days, hours, minutes, seconds));
  return m.hours();
}, 2011, 2, 12, 5, 0, 0)
  .then((value) => {
    console.log(value); // 5
  });

// Heavy processing
wkn(() => {
  let num = 0;
  for (let i = 0; i < 100000000; i++) {
    num += i;
  }
  return num;
})
  .then((value) => {
    console.log(value); // 4999999950000000
  });

// onRejected
wkn(arg => arg.map(_ => `${_}!`), {})
  .then((value) => {
    console.log(value); // not fire
  }, (reason) => {
    console.error(reason); // arg.map is not a functio
  });
```
