import chalk from "chalk";
import { fail, pass } from "../utils/prints";

export function Match(regex: RegExp): Function {
  return function (
    target: Object,
    key: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const found = original.apply(this, args);
      if (!found.match(regex)) {
        fail(key, "Match");
        console.log(
          chalk.green(`given pattern :- ${regex}\n`) +
            chalk.red(`doesnt match :- ${found} \n`)
        );
      } else pass(key, "Match");
      return found;
    };
    return descriptor;
  };
}
