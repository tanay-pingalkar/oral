import { Suite, Equal } from "oral";

@Suite()
export class beforeEveryone {
  str: string;
  constructor(beforeEveryone: string) {
    this.str = beforeEveryone;
  }

  @Equal("this is before everyone")
  checkIfworking() {
    return this.str;
  }
}
