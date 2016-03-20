# fastarr
"It needs to be **fastarrrrrr**!"

A tiny, fast Array utility with O(1) adds and removes, and maximum density.

## Install

```sh
$ npm install --save fastarr
```

## Motivation
Many software problems require being able to both store and remove values from an array. The most simple implementation, like the one EventEmitter uses, does an *O(1)* `push` and an *O(n)* lookup followed by a `splice`. However, this doesn't scale well when the data set is large, and removals are made often. A slightly more efficient implementation can be found in Facebook's dispatcher, which keeps an internal index to each value, incremented each time a value is added. This allows for both *O(1)* `add`s and `remove`s. However, when many things are removed, the array becomes sparse (holey). Not only does this put an unavoidable limit on the number of possible `add`s, it also causes most engines to incorrectly optimize dense arrays into sparse arrays, which have generally weaker performance.

## Algorithm
fastarr optimizes with two heuristics: (1) an `add` returns a `remove` function, and (2) arrays are not guaranteed to be in order. It is a more stable version of the strategy used by Facebook's dispatcher; when `remove` is called, the freed index is placed in a buffer. The next time a value is added, the buffer is first checked for any previously allocated free spaces. If one exists, it is taken and reused. If the buffer is empty, that means that the array is at maximum density, at which point the internal counter is updated.

## Usage

```js
import fastarr from 'fastarr';
```

## API

**fastarr()**
Creates a new fast array.
```js
let array = fastarr();
```

**fastarr#add(value)**
Adds `value` to the array, and returns a function that removes it.
```js
let array = fastarr();
let remove = array.add({ data: 'x' });
```

**fastarr#buffer**
Equals the raw internal array.
```js
let array = fastarr();
let remove = array.add({ data: 'x' });
array.buffer // [{ data: 'x' }]
remove();
array.buffer // []
```
