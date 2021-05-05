import chalk from "chalk";
import { fail, pass } from "../utils/prints";

export function GreaterThan(given: number): Function {
  return function (
    target: Object,
    key: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const original = descriptor.value;
    if (!global.utility.has(key)) global.toRun.add(key);
    descriptor.value = function (...args: any[]) {
      const found = original.apply(this, args);
      if (found > given) {
        pass(key, "GreaterThan", target);
      } else {
        fail(key, "GreaterThan", target);
        console.log(
          chalk.green(`found number :- ${found}\n`) +
            chalk.red(`is not greater than :- ${given}`)
        );
      }
      return found;
    };
    return descriptor;
  };
}
