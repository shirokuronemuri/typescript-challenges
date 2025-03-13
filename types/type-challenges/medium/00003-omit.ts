/*
  3 - Omit
  -------
  by Anthony Fu (@antfu) #medium #union #built-in

  ### Question

  Implement the built-in `Omit<T, K>` generic without using it.

  Constructs a type by picking all properties from `T` and then removing `K`

  For example

  ```ts
  interface Todo {
    title: string
    description: string
    completed: boolean
  }

  type TodoPreview = MyOmit<Todo, 'description' | 'title'>

  const todo: TodoPreview = {
    completed: false,
  }
  ```

  > View on GitHub: https://tsch.js.org/3
*/

/* _____________ Your Code Here _____________ */

type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
};

type MyExclude<T, K> = T extends K ? never : T;

// My first draft that fails on third test case
// as it turns out when you don't use `as` syntax to remap the keys they are losing some information like readonly modifier
type MyOmitDraft<T, K extends keyof T> = {
  [P in MyExclude<keyof T, K>]: T[P]
};

// Fixed version, just replacing MyExclude with `as` filtering that does the same thing basically.
type MyOmit<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P]
};

// Another solution, quite elegant. I wish I could come up with it myself.
type MyOmit2<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@utils';

type cases = [
  Expect<Equal<Expected1, MyOmit<Todo, 'description'>>>,
  Expect<Equal<Expected2, MyOmit<Todo, 'description' | 'completed'>>>,
  Expect<Equal<Expected3, MyOmit<Todo1, 'description' | 'completed'>>>,
];

// @ts-expect-error
type error = MyOmit<Todo, 'description' | 'invalid'>;

type cases2 = [
  Expect<Equal<Expected1, MyOmit2<Todo, 'description'>>>,
  Expect<Equal<Expected2, MyOmit2<Todo, 'description' | 'completed'>>>,
  Expect<Equal<Expected3, MyOmit2<Todo1, 'description' | 'completed'>>>,
];

// @ts-expect-error
type error2 = MyOmit2<Todo, 'description' | 'invalid'>;

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Todo1 {
  readonly title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
  completed: boolean
}

interface Expected2 {
  title: string
}

interface Expected3 {
  readonly title: string
}
