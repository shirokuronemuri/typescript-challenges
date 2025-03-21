/*
  20 - Promise.all
  -------
  by Anthony Fu (@antfu) #medium #array #promise

  ### Question

  Type the function `PromiseAll` that accepts an array of PromiseLike objects, the returning value should be `Promise<T>` where `T` is the resolved result array.

  ```ts
  const promise1 = Promise.resolve(3);
  const promise2 = 42;
  const promise3 = new Promise<string>((resolve, reject) => {
    setTimeout(resolve, 100, 'foo');
  });

  // expected to be `Promise<[number, 42, string]>`
  const p = PromiseAll([promise1, promise2, promise3] as const)
  ```

  > View on GitHub: https://tsch.js.org/20
*/

/* _____________ Your Code Here _____________ */

// this one tricked me so hard!!!!!

type MyAwaited<T> = T extends PromiseLike<infer P>
  ? MyAwaited<P>
  : T;

declare function PromiseAll<T extends readonly any[]>(values: [...T]): Promise<{
  [K in keyof T]: MyAwaited<T[K]>
}>;

// there were two main problems with my solution - first one is figuring out to replace
// (values : T) with (values: [...T]) to make types not merge together and pass third test.

// The second one is about how the intersections are being dealt in generic types.
// Can you tell what's wrong with this solution? I coudln't tell at all.
// Turns out, if an intersection of types is passed,
// T[K] extends PromiseLike<infer P> check fails, and so does the 4th test.
// so instead I should have used previously built MyAwaited<T> type that resolves promises,
// since it uses generics and processes intersection type elements one by one.
declare function PromiseAllDraft<T extends readonly any[]>(values: [...T]): Promise<{
  [K in keyof T]: T[K] extends PromiseLike<infer P> ? P : T[K]
}>;

// This all comes down to the difference between how these types A and C work:
// First type compares the union type itself so the check fails,
// while the second one uses a generic which checks each passed value
// from an intersection type separately, which results in different value
type A = 1 | 2 extends 1 ? true : false; // false
type B<T> = T extends 1 ? true : false;
type C = B<1 | 2>; // boolean

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@utils';

const promiseAllTest1 = PromiseAll([1, 2, 3] as const);
const promiseAllTest2 = PromiseAll([1, 2, Promise.resolve(3)] as const);
const promiseAllTest3 = PromiseAll([1, 2, Promise.resolve(3)]);
const promiseAllTest4 = PromiseAll<Array<number | Promise<number>>>([1, 2, 3]);

type cases = [
  Expect<Equal<typeof promiseAllTest1, Promise<[1, 2, 3]>>>,
  Expect<Equal<typeof promiseAllTest2, Promise<[1, 2, number]>>>,
  Expect<Equal<typeof promiseAllTest3, Promise<[number, number, number]>>>,
  Expect<Equal<typeof promiseAllTest4, Promise<number[]>>>,
];
