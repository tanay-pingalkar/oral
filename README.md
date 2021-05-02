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

@Suit("this is option, it will atomatically prints the name of the class as description")
export class Test {
  @Equal(3)
  addTest() {
    return add(1, 2);
  }
}
```

run `oral` in terminal and the output of your test.


## cli options
oral `location of config file` `--watch` `--testDir ./tests`

## more decorators
`@Contain()` checks of given content contain found content. <br>
`@Match()` matches on based on regex <br>
`@True()` checks if test returs true <br>
`@False()` checks of test return false <br>

more coming soon.

