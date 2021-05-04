import { Contain, Suit } from "oral";

@Suit("this is  Contain decorator test")
export class Test {
  @Contain([1, 2, 3, 4])
  containTest() {
    return [1, 2, 3, 4];
  }

  @Contain([2, 2])
  containFailTest() {
    return [1, 2, 3, 4];
  }

  @Contain({ name: "tanay", title: "holo" })
  cotainObjTest() {
    return { name: "tanay", title: "holo", description: "homecoming" };
  }

  // @Contain({ name: "tanay", title: "holo" })
  // cotainObjFailTest() {
  //   return { name: "tanay", title: "wrong title", description: "homecoming" };
  // }
}
