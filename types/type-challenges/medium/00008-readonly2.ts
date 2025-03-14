/*
  8 - Readonly 2
  -------
  by Anthony Fu (@antfu) #medium #readonly #object-keys

  ### Question

  Implement a generic `MyReadonly2<T, K>` which takes two type argument `T` and `K`.

  `K` specify the set of properties of `T` that should set to Readonly. When `K` is not provided, it should make all properties readonly just like the normal `Readonly<T>`.

  For example

  ```ts
  interface Todo {
    title: string
    description: string
    completed: boolean
  }

  const todo: MyReadonly2<Todo, 'title' | 'description'> = {
    title: "Hey",
    description: "foobar",
    completed: false,
  }

  todo.title = "Hello" // Error: cannot reassign a readonly property
  todo.description = "barFoo" // Error: cannot reassign a readonly property
  todo.completed = true // OK
  ```

  > View on GitHub: https://tsch.js.org/8
*/

/* _____________ Your Code Here _____________ */
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
};

type MyExclude<T, K> = T extends K ? never : T;

type MyOmit<T, K extends keyof T> = MyPick<T, MyExclude<keyof T, K>>;

// First solution, turns out it has redundant code after I checked out the solutions
type MyReadonly2_1<T, K extends keyof T = keyof T> = {
  readonly [P in K]: T[P]
} & {
  [P in keyof MyOmit<T, K>]: T[P]
};

type MyReadonly<T> = {
  readonly [P in keyof T]: T[P]
};

// the solution isn't much different, to be honest, yet more elegant
// It's separating MyReadonly as separate type and using MyPick to create an object with properties that should be made readonly
// as for MyOmit, turns out that I was redundantly mapping values of its result and
// I noticed that I could just remove the type mapping completely
type MyReadonly2_2<T, K extends keyof T = keyof T> = Readonly<MyPick<T, K>> & MyOmit<T, K>;

/* _____________ Test Cases _____________ */
import type { Alike, Expect } from '@utils';

type cases1 = [
  Expect<Alike<MyReadonly2_1<Todo1>, Readonly<Todo1>>>,
  Expect<Alike<MyReadonly2_1<Todo1, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2_1<Todo2, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2_1<Todo2, 'description'>, Expected>>,
];

// @ts-expect-error
type error1 = MyReadonly2_1<Todo1, 'title' | 'invalid'>;

type cases2 = [
  Expect<Alike<MyReadonly2_2<Todo1>, Readonly<Todo1>>>,
  Expect<Alike<MyReadonly2_2<Todo1, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2_2<Todo2, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2_2<Todo2, 'description'>, Expected>>,
];

// @ts-expect-error
type error2 = MyReadonly2_2<Todo1, 'title' | 'invalid'>;

interface Todo1 {
  title: string
  description?: string
  completed: boolean
}

interface Todo2 {
  readonly title: string
  description?: string
  completed: boolean
}

interface Expected {
  readonly title: string
  readonly description?: string
  completed: boolean
}
