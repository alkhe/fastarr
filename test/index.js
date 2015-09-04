import fastarr from '..';
import deq from 'deep-equal';

let arr = fastarr();

arr.add(5);
let r0 = arr.add(7);
let r1 = arr.add('x');
let r2 = arr.add({ s: 3 });
arr.add(false);

console.log(deq(arr.buffer, [5, 7, 'x', { s: 3 }, false]));

r1();

console.log(deq(arr.buffer, [5, 7, undefined, { s: 3 }, false]));

r2();

console.log(deq(arr.buffer, [5, 7, undefined, undefined, false]));

arr.add('v');
r0();

console.log(deq(arr.buffer, [5, undefined, 'v', undefined, false]));
