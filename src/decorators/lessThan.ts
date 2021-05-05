import chalk from "chalk";
import { fail, pass } from "../utils/prints";
import "reflect-metadata";

export function LessThan(given: number): Function {
  return function (
    target: Object,
    key: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const original = descriptor.value;
    if (!global.utility.has(key)) global.toRun.add(key);
    descriptor.value = function (...args: any[]) {
      const found = original.apply(this, args);
      if (found < given) {
        pass(key, "LessThan", target);
      } else {
        fail(key, "LessThan", target);
        console.log(
          chalk.green(`found number :- ${found}\n`) +
            chalk.red(`is not less than :- ${given}`)
        );
      }
      return found;
    };
    return descriptor;
  };
}
