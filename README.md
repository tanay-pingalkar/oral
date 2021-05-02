# @ral
an open source decorator based testing framework for typescript

## get started
currently this repo is not released yet so you have to fork and clone the repo before using it.

run `npm install` <br>
run `cd examples && npm install` <br>
run `oral` <br>

this will run test which are written in examples/tests. All example tests are wrriten in oral's pattern
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

run `oral` in terminal and the output of your test.


## cli options
oral `location of config file` `--watch`

## more decorators
`@Contain()` checks of given content contain found content.
`@Match()` matches on based on regex
`@True()` checks if test returs true
`@False()` checks of test return false

more coming soon.

