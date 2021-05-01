import { False } from "oral";
import { True } from "oral";

export class Test {
  @True()
  @False()
  falseTest() {
    return false;
  }
}
