import chalk from "chalk";
import { fail, pass } from "../utils/prints";

export function False(): Function {
  return function (
    target: Object,
    key: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const original = descriptor.value;
    Reflect.defineMetadata("role", "assertion", target, key);
    descriptor.value = function (...args: any[]) {
      const found = original.apply(this, args);
      if (found) {
        this.emit("fail", key, "False");
        console.log(
          chalk.green(`given :- false \n`) + chalk.red(`found :- ${found}`)
        );
      } else {
        this.emit("pass", key, "False");
      }
      return found;
    };
    return descriptor;
  };
}
