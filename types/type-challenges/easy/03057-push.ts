/*
  3057 - Push
  -------
  by jiangshan (@jiangshanmeta) #easy #array

  ### Question

  Implement the generic version of ```Array.push```

  For example:

  ```typescript
  type Result = Push<[1, 2], '3'> // [1, 2, '3']
  ```

  > View on GitHub: https://tsch.js.org/3057
*/

/* _____________ Your Code Here _____________ */

type Push<T extends any[], U> = [...T, U];

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@utils';

type cases = [
  Expect<Equal<Push<[], 1>, [1]>>,
  Expect<Equal<Push<[1, 2], '3'>, [1, 2, '3']>>,
  Expect<Equal<Push<['1', 2, '3'], boolean>, ['1', 2, '3', boolean]>>,
];
