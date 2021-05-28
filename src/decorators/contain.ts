import chalk from "chalk";

function resolver(this: any, found: any, given: any, key: string): void {
  if (typeof given === "object" && JSON.stringify(found).startsWith("[")) {
    let newArray: Array<any> = [];
    const newGiven: Array<any> = given as Array<any>;
    if (typeof found === "object" && JSON.stringify(found).startsWith("[")) {
      newGiven.forEach((element) => {
        newArray.push(found.find((val) => val === element));
      });
    } else {
      this.emit("fail", key, "Contain:Array");
      console.log(
        chalk.red(`expected array but found ${typeof found} \n `),
        chalk.green(`given :- ${given}\n`),
        chalk.red(`found :- ${found}`)
      );
    }
    if (JSON.stringify(given) === JSON.stringify(newArray)) {
      this.emit("pass", key, "Contain:Array");
    } else {
      this.emit("fail", key, "Contain:Array");
      console.log(
        chalk.green(`given :- ${given} \n`),
        chalk.red(`found :- ${found}`)
      );
    }
  } else if (
    typeof given === "object" &&
    JSON.stringify(found).startsWith("{")
  ) {
    const newGiven: Object = given;

    if (typeof found === "object" && JSON.stringify(found).startsWith("{")) {
      let i: number = 0;
      for (let objKey in newGiven) {
        if (newGiven[objKey] === found[objKey]) {
          i++;
        }
      }
      if (Object.keys(newGiven).length === i) {
        this.emit("pass", key, "Contain:Object");
      } else {
        this.emit("fail", key, "Contain:Object");
        console.log(
          chalk.green(`given :-\n${JSON.stringify(given, null, " ")} \n`),
          chalk.red(`found :-\n${JSON.stringify(found, null, " ")}`)
        );
      }
    } else {
      this.emit("fail", key, "Contain:Object");
      console.log(
        chalk.red(`expected object but found ${typeof found} \n `),
        chalk.green(`given :-\n${JSON.stringify(given, null, " ")} `),
        chalk.red(`found :-\n${JSON.stringify(found, null, " ")}`)
      );
    }
  }
}

export function Contain<type>(
  given: Array<any> | string | object | type
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
