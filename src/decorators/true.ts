import chalk from "chalk";
import { Add } from "../utils/add";
import { fail, pass } from "../utils/prints";

export function True(): Function {
  return function (
    target: Object,
    key: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const original = descriptor.value;
    Add(key);
    descriptor.value = function (...args: any[]) {
      const found = original.apply(this, args);
      if (!found) {
        fail(key, "True", target);
        console.log(
          chalk.green(`given :- true \n`) + chalk.red(`found :- ${found}`)
        );
      } else {
        pass(key, "True", target);
      }
      return found;
    };
    return descriptor;
  };
}
