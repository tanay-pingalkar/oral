import { Match, Suite } from "oral-ts";

@Suite("this is Match decorator test test")
export class Test {
  @Match(/this is [\w\W].* oral/g)
  regexTest() {
    return "this is i guess oral";
  }

  @Match(/oos/g)
  regexFailTest() {
    return "this is not oopss";
  }
}
