# @ral
an open source decorator based testing framework for typescript

## get started
currently this repo is not released yet so you have to fork and clone the repo before using it.

run `npm install`
run `cd examples && npm install`
run `oral`

this will run test which are written in examples/tests. Al tests are wrriten in oral's pattern
like this 

``` typescript
import { Equal } from "oral";

function add(a: number, b: number) {
  return a + b;
}
export class Test {
  @Equal(3)
  addTest() {
    return add(1, 2);
  }
}
```
