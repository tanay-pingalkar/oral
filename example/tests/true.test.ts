import { Suit, True } from "oral";
import { False } from "oral";

@Suit("this is False decorator")
export class Test {
  @True()
  @False()
  trueTest() {
    return true;
  }
}
