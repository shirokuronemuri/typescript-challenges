296 - Permutation;
/*
  -------
  by Naoto Ikuno (@pandanoir) #medium #union

  ### Question

  Implement permutation type that transforms union types into the array that includes permutations of unions.

  ```typescript
  type perm = Permutation<'A' | 'B' | 'C'>; // ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']
  ```

  > View on GitHub: https://tsch.js.org/296
*/

/* _____________ Your Code Here _____________ */

// actually impossible to solve without prior knowledge on some interesting hacks.

// first, [T] extends [never] helps to prevent stopping typescript from filtering out never
// as it gets lost in type distribution by converting it into a tuple with actual never value

// second, T extends T makes T to distribute across all existing values and create separate execution branches for each one
// and so instead of full T = 'A' | 'B' | 'C' we end up with T = 'A', 'B' and 'C' separately
// so we can create a tuple with it and whatever else is left in U after excluding this element
type Permutation<T, U = T> =
  [T] extends [never]
    ? []
    : T extends T
      ? [T, ...Permutation<Exclude<U, T>>]
      : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@utils';

type cases = [
  Expect<Equal<Permutation<'A'>, ['A']>>,
  Expect<Equal<Permutation<'A' | 'B' | 'C'>, ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']>>,
  Expect<Equal<Permutation<'B' | 'A' | 'C'>, ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']>>,
  Expect<Equal<Permutation<boolean>, [false, true] | [true, false]>>,
  Expect<Equal<Permutation<never>, []>>,
];
