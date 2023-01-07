# @ral

an open source decorator based testing framework for typescript

## features

- decorator based testing
- watch mode
- async tests with not efforts

## install

currently this repo is not released yet so you have to fork and clone the repo before using it. <br>
run `npm install` <br>
run `cd examples && npm install` <br>
run `oral` <br>

## how to write tests in oral

writing tests in oral is same as writing tests in other framework but in oral, there is no describe and no it, instead of that, it usesname of you class as description of you tests. To get started with it <br>
` touch oral.config.ts && mkdir tests`

- oral.config.ts

```typescript
module.export = {
  testDir: "/tests",
};
```

`cd tests && touch firstTest.test.ts`

inside firstTest.test.ts

```typescript
import { Suit, Equal } from "oral";

@Suite()
export class myFirstTest {
  @Equal("this should pass")
  thisShouldPass() {
    return "this should pass";
  }

  @Equal(5)
  thisShouldFail() {
    return 2 + 2;
  }
}
```

save and run
`oral --watch`

![output](https://github.com/tanay-pingalkar/oral/blob/main/output.png)

and here you go..

## cli options

oral `location of config file` `--watch` `--testDir /tests/` `--clear` `--noclear` `--help` `--version` `--notify` `--file name_of_file` <br>
all cli options can be inclue in `oral.config.ts`

## Api

`@Equal()` <br>
`@Suite()` <br>
`@Contain()` <br>
`@Match()` <br>
`@True()` <br>
`@False()` <br>
`@GreaterThan()` <br>
`@LessThan()` <br>
`@Instanceof()` <br>
`@Typeof()` <br>
`@Extend()` <br>
`@Before()` <br>
`@After()` <br>
`@Util()` <br>
`@BeforeEach()` <br>
`@AfterEach()` <br>
more coming soon. <br>
detailed examples in example/tests folder... <br>
continue reading to know more...

## @Before() and @After()

```typescript
import { Suite, Before, After, Equal } from "oral";
@Suite()
export class beforeAfterTest {
  name: string;
  @Before()
  before() {
    this.name = "a name";
    // create connection
  }

  @Equal("a name")
  shouldReturnName() {
    return this.name;
  }

  @After()
  after() {
    this.name = undefied;
    // drop database
  }
}
```

## @Util()

```typescript
import { Util, Suit, GreaterThan } from "oral";
@Suite()
export class utilTest {
  @Util()
  @GreaterThan(5)
  aUtil(num1: number, num2: number) {
    return num1 + num2;
  }

  realTest() {
    this.aUtil();
  }
}
```

## beforeEveryone & afterEveryone

do not support in new version currenly, available soon !!! `git checkout old` to use this

- `oral.config.ts`

```typescript
function Afunc() {
  // create database
  return "a global string";
}
module.export = {
  beforeEveryone: Afunc,
};
```

- aTest.test.ts

```typescript
import { Suite, Equal } from "oral";
@Suite()
export class aTest {
  str: string;
  constructure(str: string) {
    this.str = str; // aFunc's returned value
  }

  @Equal()
  checkIfStrExist() {
    return this.str;
  }
}
```

## @Extend()

```typescript
import { Extend, Suite } from "oral";

const decoratorFunc = (val: string) => {
  if (val === "a string") return true;
  return false;
};

@Suite()
export class extendDecoratorTest {
  @Extend("my own decorator", decoratorFunc)
  extendDecoratorTesting() {
    return "a string";
  }

  @Extend("my own decorator", decoratorFunc)
  extendDecoratorTestingFail() {
    return "a false string";
  }
}
```

## @BeforeEach() & @AfterEach()

```typescript
import { Suite, Equal, BeforeEach, AfterEach } from "oral";

@Suite()
export class beforeEveryone {
  num = 0;
  @BeforeEach()
  beforeEach() {
    this.num = this.num + 1;
  }
  @AfterEach()
  beforeEach() {
    this.num = 0;
  }
  @Equal(1)
  checkIfEqualOne() {
    return this.num;
  }

  @Equal(1)
  checkIfEqualOneAgain() {
    return this.num;
  }
}
```

## philosophy

Hello i am tanay pingalkar. I like to code things that helps other and are open and free. I have created this testing framework for using the power of decorators and to give testers a complete new exciting workflow. This framework is typescript specific and dedicated to it. This framework believe that every assertion counts the quality of software and thats why every method in a class is a assertion. I currently dont have a good name but I call it "oral" (@ral) for some reason. Suggestion for name is needed. This project is open source and Licensed under [MIT License](https://github.com/tanay-pingalkar/oral/blob/main/LICENSE). I will like to see feedback and ideas on github issues to make it better.

## contribution

this porject is open source and will always live open source. Contributer's are highly welcome and appreciated. You can read [CONTRIBUTING.md](https://github.com/tanay-pingalkar/oral/blob/main/CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](https://github.com/tanay-pingalkar/oral/blob/main/CODE_OF_CONDUCT.md)
to know more about contribution process.
