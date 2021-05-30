import chalk from "chalk";

function resolver(this: any, given: any, found: any, key: string): void {
  if (found instanceof given) {
    this.emit("pass", key, "InstanceOf");
  } else {
    this.emit("fail", key, "InstanceOf");
    console.log(
      chalk.green(`given instance :- ${given} \n`) +
        chalk.redBright(`found instace :- ${found}`)
    );
  }
}

export function Instanceof<t extends new (...args: any) => any>(
  given: InstanceType<t> | any
): Function {
  return function (
    target: Object,
    key: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const original = descriptor.value;
    Reflect.defineMetadata("role", "assertion", target, key);
    descriptor.value = function (...args: any[]) {
      const found = original.apply(this, args);
      if (found !== undefined) {
        if (found.constructor.name === "Promise") {
          found.then((found: any) => resolver.apply(this, [given, found, key]));
        } else resolver.apply(this, [given, found, key]);
      }
      return found;
    };
    return descriptor;
  };
}
