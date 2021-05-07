import { False, Suite } from "oral";
import { True } from "oral";

@Suite("this is True test")
export class Test {
  @True()
  @False()
  falseTest() {
    return false;
  }
}
