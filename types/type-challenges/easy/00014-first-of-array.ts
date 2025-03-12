/*
  14 - First of Array
  -------
  by Anthony Fu (@antfu) #easy #array

  ### Question

  Implement a generic `First<T>` that takes an Array `T` and returns its first element's type.

  For example:

  ```ts
  type arr1 = ['a', 'b', 'c']
  type arr2 = [3, 2, 1]

  type head1 = First<arr1> // expected to be 'a'
  type head2 = First<arr2> // expected to be 3
  ```

  > View on GitHub: https://tsch.js.org/14
*/

/* _____________ Your Code Here _____________ */

type First1<T extends any[]> = T extends [infer A, ...infer _Rest]
  ? A
  : never;

type First2<T extends any[]> = T[number] extends never ? never : T[0];

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@utils';

type cases1 = [
  Expect<Equal<First1<[3, 2, 1]>, 3>>,
  Expect<Equal<First1<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<First1<[]>, never>>,
  Expect<Equal<First1<[undefined]>, undefined>>,
];

type errors1 = [
  // @ts-expect-error
  First1<'notArray'>,
  // @ts-expect-error
  First1<{ 0: 'arrayLike' }>,
];

type cases2 = [
  Expect<Equal<First2<[3, 2, 1]>, 3>>,
  Expect<Equal<First2<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<First2<[]>, never>>,
  Expect<Equal<First2<[undefined]>, undefined>>,
];

type errors2 = [
  // @ts-expect-error
  First2<'notArray'>,
  // @ts-expect-error
  First2<{ 0: 'arrayLike' }>,
];
