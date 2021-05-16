import chalk from "chalk";

export function Match(regex: RegExp): Function {
  return function (
    target: Object,
    key: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const original = descriptor.value;
    Reflect.defineMetadata("role", "assertion", target, key);
    descriptor.value = function (...args: any[]) {
      const found = original.apply(this, args);
      if (!found.match(regex)) {
        this.emit("fail", key, "Match");
        console.log(
          chalk.green(`given pattern :- ${regex}\n`) +
            chalk.red(`doesnt match :- ${found}`)
        );
      } else {
        this.emit("pass", key, "Match");
      }
      return found;
    };
    return descriptor;
  };
}
