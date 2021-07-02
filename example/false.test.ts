import { False, Suite } from "oral-ts";
import { True } from "oral-ts";

@Suite("this is True test")
export class Test {
  @True()
  @False()
  falseTest() {
    return false;
  }
}
