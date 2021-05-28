import chalk from "chalk";
import { TypeOfTag } from "typescript";

function resolver(this: any, found: any, given: any, key: string): void {
  if (typeof found === given) {
    this.emit("pass", key, "Typeof");
  } else {
    this.emit("fail", key, "Typeof");
    console.log(
      chalk.green(`given type :- ${given} \n`) +
        chalk.redBright(`found type :- ${typeof found}`)
    );
  }
}

export function Typeof(given: TypeOfTag): Function {
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
        if (found.constructor.name === "Promise") {
          found.then((found: any) => resolver.apply(this, [given, found, key]));
        } else resolver.apply(this, [given, found, key]);
      }
      return found;
    };
    return descriptor;
  };
}
