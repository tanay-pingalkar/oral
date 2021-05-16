import { Extend, Suite } from "oral";

const decoratorFunc = (found) => {
  if (found === "a string") return true;
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
