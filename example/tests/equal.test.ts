import { Equal, Suit } from "oral";

function add(a: number, b: number) {
  return a + b;
}

@Suit("this is Equal decorator test")
export class Test {
  @Equal(3)
  addTest() {
    return add(1, 2);
  }

  @Equal("this is good")
  @Equal("this is not good")
  stringTest() {
    // do what ever
    return "this is not good";
  }

  @Equal(["lol", "ball", "troll", "chall"])
  arrayTest() {
    return ["lol"];
  }
}
