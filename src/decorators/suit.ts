import chalk from "chalk";
import { centerString } from "../utils/centerString";

export function Suite(description?: string) {
  function whatDescription(constructor: string): string {
    let res: string;
    if (description) {
      res = description;
    } else res = constructor;
    let array: Array<string> = res.split("");
    return centerString(array, 50);
  }
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    const num = global.tests.push({
      name: constructor.name,
      passed: 0,
      failed: 0,
    });
    constructor.prototype.index = num - 1;
    constructor.prototype.log = function () {
      console.log(
        `\n${chalk.bold.bgMagentaBright.black(
          whatDescription(constructor.name)
        )}`
      );
    };
  };
}
