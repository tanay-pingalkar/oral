import { Suit, LessThan } from "oral";

@Suit()
export class LessThanTest {
  @LessThan(5)
  shouldGreaterThan5() {
    return 6;
  }

  @LessThan(5)
  shouldGreaterThan5Fail() {
    this.util_see(12);
    return 3;
  }

  @LessThan(10)
  util_see(number: number) {
    return number;
  }
}
