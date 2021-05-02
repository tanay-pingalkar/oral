import { Suit, True } from "oral";
import { False } from "oral";

@Suit("this")
export class Test {
  @True()
  @False()
  trueTest() {
    return true;
  }
}
