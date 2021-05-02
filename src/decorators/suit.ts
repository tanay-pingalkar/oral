import chalk from "chalk";
import { centerString } from "../utils/centerString";

export function Suit(description?: string) {
  function whatDescription(constructor: string): string {
    let res: string;
    if (description) {
      res = description;
    } else res = constructor;
    let array: Array<string> = res.split("");
    return centerString(array, 50);
  }
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    console.log(
      `${chalk.bold.bgMagentaBright.black(whatDescription(constructor.name))}`
    );
  };
}
