import chalk from "chalk";
import { TypeOfTag } from "typescript";
import { Add } from "../utils/add";
import { fail, pass } from "../utils/prints";

export function Typeof(given: TypeOfTag): Function {
  return function (
    target: Object,
    key: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const original = descriptor.value;
    Add(key);
    descriptor.value = function (...args: any[]) {
      const found = original.apply(this, args);
      if (typeof found === given) {
        pass(key, "Type", target);
      } else {
        fail(key, "Type", target);
        console.log(
          chalk.green(`given type :- ${given} \n`) +
            chalk.redBright(`found type :- ${typeof found}`)
        );
      }
      return found;
    };
    return descriptor;
  };
}
