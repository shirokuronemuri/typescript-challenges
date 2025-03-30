/*
  612 - KebabCase
  -------
  by Johnson Chu (@johnsoncodehk) #medium #template-literal

  ### Question

  Replace the `camelCase` or `PascalCase` string with `kebab-case`.

  `FooBarBaz` -> `foo-bar-baz`

  For example

  ```ts
  type FooBarBaz = KebabCase<"FooBarBaz">
  const foobarbaz: FooBarBaz = "foo-bar-baz"

  type DoNothing = KebabCase<"do-nothing">
  const doNothing: DoNothing = "do-nothing"
  ```

  > View on GitHub: https://tsch.js.org/612
*/

/* _____________ Your Code Here _____________ */

// very satisfied that I solved it myself so elegantly after an hour of struggle
type KebabCase<S extends string> =
  S extends `${infer FirstLetter}${infer Rest}`
    ? Rest extends Uncapitalize<Rest>
      ? `${Uncapitalize<FirstLetter>}${KebabCase<Rest>}`
      : `${Uncapitalize<FirstLetter>}-${KebabCase<Uncapitalize<Rest>>}`
    : S;

type a = KebabCase<'aaaAaaa'>;
type b = KebabCase<'F'>;
type c = KebabCase<'foo-bar'>;
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@utils';

type cases = [
  Expect<Equal<KebabCase<'FooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'fooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'foo-bar'>, 'foo-bar'>>,
  Expect<Equal<KebabCase<'foo_bar'>, 'foo_bar'>>,
  Expect<Equal<KebabCase<'Foo-Bar'>, 'foo--bar'>>,
  Expect<Equal<KebabCase<'ABC'>, 'a-b-c'>>,
  Expect<Equal<KebabCase<'-'>, '-'>>,
  Expect<Equal<KebabCase<''>, ''>>,
  Expect<Equal<KebabCase<'😎'>, '😎'>>,
  // My own test case
  Expect<Equal<KebabCase<'F'>, 'f'>>,
];
