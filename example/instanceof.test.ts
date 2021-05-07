import { Suite, Instanceof } from "oral";

@Suite()
export class instanceTesting {
  @Instanceof(Array)
  shouldInstanceofObject() {
    return ["lol"];
  }

  @Instanceof(Number)
  shouldInstanceofNumber() {
    return 2;
  }

  @Instanceof(Number)
  shouldInstanceofFail() {
    return "lol";
  }
}
