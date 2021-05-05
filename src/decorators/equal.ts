import chalk from "chalk";
import { Add } from "../utils/add";
import { fail, pass } from "../utils/prints";

export function Equal<type>(given: any | type): Function {
  return function (
    target: Object,
    key: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const original = descriptor.value;
    Add(key);
    descriptor.value = function (...args: any[]) {
      const found = original.apply(this, args);
      if (found !== given) {
        if (
          typeof found === "object" &&
          JSON.stringify(found) === JSON.stringify(given)
        ) {
          pass(key, "Equal", target);
          global.tests[target["index"]].passed =
            global.tests[target["index"]].passed + 1;
        } else {
          fail(key, "Equal", target);
          console.log(
            chalk.green(`given :- ${given} \n`) + chalk.red(`found :- ${found}`)
          );
        }
      } else {
        pass(key, "Equal", target);
      }
      return found;
    };
    return descriptor;
  };
}
