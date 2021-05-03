# @ral
an open source decorator based testing framework for typescript

## features
- decorator based testing
- watch mode

## install
currently this repo is not released yet so you have to fork and clone the repo before using it.
run `npm install` <br>
run `cd examples && npm install` <br>
run `oral` <br>

## how to write tests in oral
writing tests in oral is same as writing tests in other framework but in oral, there is no describe and no it, instead of that, it usesname of you class as description of you tests. To get started with it 
``` touch oral.config.ts` && mkdir tests```

- oral.config.ts
``` typescript
module.export={
  testDir:"/tests"
}
```

``` cd tests && touch firstTest.test.ts ```

inside firstTest.test.ts
``` typescript
import { Suit, Equal } from "oral"

@Suit()
export class myFirstTest{
    @Equal("this should pass")
    thisShouldPass(){
      return "this should pass"
    }
    
    @Equal(5)
    thisShouldFail(){
      return 2+2
    }
}
```
save and run
``` oral --watch ```

![output](https://github.com/tanay-pingalkar/oral/blob/main/Screenshot%20from%202021-05-03%2017-25-42.png)

and here you go..

## cli options
oral `location of config file` `--watch` `--testDir ./tests`

## more decorators
`@Contain()` checks of given content contain found content. <br>
`@Match()` matches on based on regex <br>
`@True()` checks if test returs true <br>
`@False()` checks if test return false <br>
`@GreaterThan()` checks if found number is greater than given number <br>
`@LreaterThan()` checks if found number is less than given number <br>



more coming soon.

