import { Equal, Suite } from "oral";

function add(a: number, b: number) {
  return a + b;
}

@Suite("this is Async test")
export class Test {
  @Equal(3)
  async add_test() {
    return add(1, 2);
  }
}
