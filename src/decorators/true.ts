import chalk from "chalk";
import { fail, pass } from "../utils/prints";

export function True(): Function {
  return function (
    target: Object,
    key: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const found = original.apply(this, args);
      if (!found) {
        fail(key, "True");
        global.tests[target["index"]].failed =
          global.tests[target["index"]].failed + 1;
        console.log(
          chalk.green(`given :- true \n`) + chalk.red(`found :- ${found}`)
        );
      } else {
        global.tests[target["index"]].passed =
          global.tests[target["index"]].passed + 1;
        pass(key, "True");
      }
      return found;
    };
    return descriptor;
  };
}
