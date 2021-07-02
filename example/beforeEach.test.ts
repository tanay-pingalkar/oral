import { Suite, Equal, BeforeEach, AfterEach } from "oral-ts";

@Suite()
export class beforeEach {
  num = 0;

  @BeforeEach()
  addOne() {
    this.num = this.num + 1;
  }

  @AfterEach()
  reset() {
    this.num = 0;
  }

  @Equal(1)
  checkIfEqualOne() {
    return this.num;
  }

  @Equal(1)
  checkIfEqualOneAgain() {
    return this.num;
  }
}
