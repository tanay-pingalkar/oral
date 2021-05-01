import chalk from "chalk";
import { fail, pass } from "../utils/prints";

export function True(): any {
  return function (
    target: Object,
    key: string,
    descriptor: PropertyDescriptor
  ): any {
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const found = original.apply(this, args);
      if (!found) {
        fail(key);
        console.log(
          chalk.green(`given :- true \n`) + chalk.red(`found :- ${found} \n`)
        );
      } else pass(key);
      return found;
    };
    return descriptor;
  };
}
