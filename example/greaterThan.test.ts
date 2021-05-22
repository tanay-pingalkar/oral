import { Suite, GreaterThan } from "oral";

@Suite()
export class GreaterThanTest {
  @GreaterThan(5)
  shouldGreaterThan5() {
    return 6;
  }

  @GreaterThan(5)
  shouldGreaterThan54Fail() {
    return 35;
  }
}
