import chalk from "chalk";
import { fail, pass } from "../utils/prints";

export function Equal(given: any): any {
  return function (
    target: Object,
    key: string,
    descriptor: PropertyDescriptor
  ): any {
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const found = original.apply(this, args);
      if (found !== given) {
        if (
          typeof found === "object" &&
          JSON.stringify(found) === JSON.stringify(given)
        ) {
          pass(key);
        } else {
          fail(key);
          console.log(
            chalk.green(`given :- ${given} \n`) +
              chalk.red(`found :- ${found} \n`)
          );
        }
      } else pass(key);
      return found;
    };
    return descriptor;
  };
}
