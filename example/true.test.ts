import { Suite, True } from "oral-ts";
import { False } from "oral-ts";

@Suite("this is False decorator")
export class Test {
  @True()
  @False()
  trueTest() {
    return true;
  }
}
