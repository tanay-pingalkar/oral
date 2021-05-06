import { Before, After, Suite, Equal } from "oral";

@Suite()
export class beforeAfterTest {
  name: string;
  @Before()
  thisIsBefore() {
    this.name = "before called";
  }

  @Equal("before called")
  nameNotundefied() {
    return this.name;
  }

  @After()
  @Equal(undefined)
  thisIsAfter() {
    this.name = undefined;
    return this.name;
  }
}
