import chalk from "chalk";
import { Add } from "../utils/add";
import { fail, pass } from "../utils/prints";

export function Instanceof<t extends new (...args: any) => any>(
  given: InstanceType<t> | any
): Function {
  return function (
    target: Object,
    key: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const original = descriptor.value;
    Add(key);
    descriptor.value = function (...args: any[]) {
      const found = original.apply(this, args);
      if (found instanceof given) {
        pass(key, "Type", target);
      } else {
        fail(key, "Type", target);
        console.log(
          chalk.green(`given instance :- ${given} \n`) +
            chalk.redBright(`found instace :- ${found}`)
        );
      }
      return found;
    };
    return descriptor;
  };
}
