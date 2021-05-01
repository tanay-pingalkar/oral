import { Equal } from "oral";

function add(a: number, b: number) {
  return a + b;
}
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

  @Equal(["lol"])
  arrayTest() {
    return ["lol"];
  }

  lol() {
    return "lol";
  }
}
