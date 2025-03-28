/*
  527 - Append to object
  -------
  by Andrey Krasovsky (@bre30kra69cs) #medium #object-keys

  ### Question

  Implement a type that adds a new field to the interface. The type takes the three arguments. The output should be an object with the new field.

  For example

  ```ts
  type Test = { id: '1' }
  type Result = AppendToObject<Test, 'value', 4> // expected to be { id: '1', value: 4 }
  ```

  > View on GitHub: https://tsch.js.org/527
*/

/* _____________ Your Code Here _____________ */
// My own solution
type AppendToObject1<T, U extends keyof any, V> = { [Key in keyof T | U]: Key extends keyof T ? T[Key] : V };

// another way to do the thing using additional generic type
type Compute<T> = { [K in keyof T]: T[K] };
type AppendToObject2<T, U extends keyof any, V> = Compute<T & { [Key in U]: V }>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@utils';

type test1 = {
  key: 'cat'
  value: 'green'
};

type testExpect1 = {
  key: 'cat'
  value: 'green'
  home: boolean
};

type test2 = {
  key: 'dog' | undefined
  value: 'white'
  sun: true
};

type testExpect2 = {
  key: 'dog' | undefined
  value: 'white'
  sun: true
  home: 1
};

type test3 = {
  key: 'cow'
  value: 'yellow'
  sun: false
};

type testExpect3 = {
  key: 'cow'
  value: 'yellow'
  sun: false
  moon: false | undefined
};

type cases1 = [
  Expect<Equal<AppendToObject1<test1, 'home', boolean>, testExpect1>>,
  Expect<Equal<AppendToObject1<test2, 'home', 1>, testExpect2>>,
  Expect<Equal<AppendToObject1<test3, 'moon', false | undefined>, testExpect3>>,
];

type cases2 = [
  Expect<Equal<AppendToObject2<test1, 'home', boolean>, testExpect1>>,
  Expect<Equal<AppendToObject2<test2, 'home', 1>, testExpect2>>,
  Expect<Equal<AppendToObject2<test3, 'moon', false | undefined>, testExpect3>>,
];
