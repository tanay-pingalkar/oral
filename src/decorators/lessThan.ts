import chalk from "chalk";

function resolver(this: any, found: any, given: any, key: string): void {
  if (found < given) {
    this.emit("pass", key, "LessThan");
  } else {
    this.emit("fail", key, "LessThan");
    console.log(
      chalk.green(`found number :- ${found}\n`) +
        chalk.red(`is not less than :- ${given}`)
    );
  }
}

export function LessThan(given: number): Function {
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
