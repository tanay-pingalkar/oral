import chalk from "chalk";

export function GreaterThan(given: number): Function {
  return function (
    target: Object,
    key: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const original = descriptor.value;
    Reflect.defineMetadata("role", "assertion", target, key);
    descriptor.value = function (...args: any[]) {
      const found = original.apply(this, args);
      if (found > given) {
        this.emit("pass", key, "GreaterThan");
      } else {
        this.emit("fail", key, "GreaterThan");
        console.log(
          chalk.green(`found number :- ${found}\n`) +
            chalk.red(`is not greater than :- ${given}`)
        );
      }
      return found;
    };
    return descriptor;
  };
}
