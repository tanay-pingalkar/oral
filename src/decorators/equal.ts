import chalk from "chalk";
import { fail, pass } from "../utils/prints";

export function Equal<type>(given: any | type): Function {
  return function (
    target: Object,
    key: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const found = original.apply(this, args);
      if (found !== given) {
        if (
          typeof found === "object" &&
          JSON.stringify(found) === JSON.stringify(given)
        ) {
          pass(key, "Equal");
        } else {
          fail(key, "Equal");
          console.log(
            chalk.green(`given :- ${given} \n`) +
              chalk.red(`found :- ${found} \n`)
          );
        }
      } else pass(key, "Equal");
      return found;
    };
    return descriptor;
  };
}
