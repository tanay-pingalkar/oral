import { BeforeAll, AfterAll, Suite, Equal } from "oral-ts";

@Suite()
export class beforeAfterTest {
  name: string;
  @BeforeAll()
  thisIsBefore() {
    this.name = "before called";
  }

  @Equal("before called")
  nameNotundefied() {
    return this.name;
  }

  @AfterAll()
  @Equal(undefined)
  thisIsAfter() {
    this.name = undefined;
    return this.name;
  }
}
