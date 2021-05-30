import chalk from "chalk";

function resolver(this: any, regex: RegExp, found: any, key: string): void {
  if (!found.match(regex)) {
    this.emit("fail", key, "Match");
    console.log(
      chalk.green(`given pattern :- ${regex}\n`) +
        chalk.red(`doesnt match :- ${found}`)
    );
  } else {
    this.emit("pass", key, "Match");
  }
}

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
      if (found !== undefined) {
        if (found.constructor.name === "Promise") {
          found.then((found: any) => resolver.apply(this, [regex, found, key]));
        } else resolver.apply(this, [regex, found, key]);
      }
      return found;
    };
    return descriptor;
  };
}
