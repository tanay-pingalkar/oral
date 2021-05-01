import { True } from "oral";
import { False } from "oral";
class Test {
  @True()
  @False()
  trueTest() {
    return true;
  }
}
