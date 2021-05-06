import chalk from "chalk";
import { Add } from "../utils/add";
import { fail, pass } from "../utils/prints";

export function Match(regex: RegExp): Function {
  return function (
    target: Object,
    key: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const original = descriptor.value;
    Add(key);
    descriptor.value = function (...args: any[]) {
      const found = original.apply(this, args);
      if (!found.match(regex)) {
        fail(key, "Match", target);
        console.log(
          chalk.green(`given pattern :- ${regex}\n`) +
            chalk.red(`doesnt match :- ${found}`)
        );
      } else {
        pass(key, "Match", target);
      }
      return found;
    };
    return descriptor;
  };
}
