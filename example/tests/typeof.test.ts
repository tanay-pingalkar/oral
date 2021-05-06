import { Suite, Typeof } from "oral";

@Suite()
export class typeTesting {
  @Typeof("object")
  shouldTypeofObject() {
    return ["lol"];
  }

  @Typeof("number")
  shouldTypeofNumber() {
    return 2;
  }

  @Typeof("number")
  shouldTypeofFail() {
    return "lol";
  }
}
