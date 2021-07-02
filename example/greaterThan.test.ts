import { Suite, GreaterThan } from "oral-ts";

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
