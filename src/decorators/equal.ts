import chalk from "chalk";

function resolver(this: any, found: any, given: any, key: string): void {
  if (found !== given) {
    if (
      typeof found === "object" &&
      JSON.stringify(found) === JSON.stringify(given)
    ) {
      this.emit("pass", key, "Equal");
    } else {
      this.emit("fail", key, "Equal");
      console.log(
        chalk.green(`given :- ${given} \n`) + chalk.red(`found :- ${found}`)
      );
    }
  } else {
    this.emit("pass", key, "Equal");
  }
}

export function Equal<type>(given: any | type): Function {
  return function (
    target: Object,
    key: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const original = descriptor.value;
    Reflect.defineMetadata("role", "assertion", target, key);

    descriptor.value = function (...args: any[]) {
      let found = original.apply(this, args);

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
