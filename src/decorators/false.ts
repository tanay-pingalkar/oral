import chalk from "chalk";
import { fail, pass } from "../utils/prints";

export function False(): Function {
  return function (
    target: Object,
    key: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const original = descriptor.value;
    if (!global.utility.has(key)) global.toRun.add(key);
    descriptor.value = function (...args: any[]) {
      const found = original.apply(this, args);
      if (found) {
        fail(key, "False", target);
        console.log(
          chalk.green(`given :- false \n`) + chalk.red(`found :- ${found}`)
        );
      } else {
        pass(key, "False", target);
      }
      return found;
    };
    return descriptor;
  };
}
