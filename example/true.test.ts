import { Suite, True } from "oral";
import { False } from "oral";

@Suite("this is False decorator")
export class Test {
  @True()
  @False()
  trueTest() {
    return true;
  }
}
