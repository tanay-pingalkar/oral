import { Equal, Suite, Util } from "oral";

@Suite()
export class testingUtil {
  @Util()
  @Equal(5)
  thisWillNotRunDefault(num: number) {
    return num;
  }

  @Equal(5)
  thisWillRun() {
    this.thisWillNotRunDefault(5);
    return 6;
  }
}
