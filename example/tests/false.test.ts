import { False, Suit } from "oral";
import { True } from "oral";

@Suit("this is equal test")
export class Test {
  @True()
  @False()
  falseTest() {
    return false;
  }
}
