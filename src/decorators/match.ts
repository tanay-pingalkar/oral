import chalk from "chalk";
import { fail, pass } from "../utils/prints";

export function Match(regex: RegExp): any {
  return function (
    target: Object,
    key: string,
    descriptor: PropertyDescriptor
  ): any {
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const found = original.apply(this, args);
      if (!found.match(regex)) {
        fail(key);
        console.log(
          chalk.green(`given pattern :- ${regex}\n`) +
            chalk.red(`doesnt match :- ${found} \n`)
        );
      } else pass(key);
      return found;
    };
    return descriptor;
  };
}
