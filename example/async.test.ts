import { Equal, Suite, True, False, Contain, Typeof, Instanceof } from "oral";

function add(a: number, b: number) {
  return a + b;
}

@Suite("this is Async test")
export class Test {
  @Equal(3)
  @True()
  @False()
  @Contain(2)
  @Typeof("number")
  @Instanceof(Number)
  async async_test() {
    return add(1, 2);
  }
}
