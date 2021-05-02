import chalk from "chalk";
import { fail, pass } from "../utils/prints";

export function Contain<type>(
  given: Array<any> | string | object | type
): Function {
  return function (
    target: Object,
    key: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const found = original.apply(this, args);
      if (typeof given === "object" && JSON.stringify(found).startsWith("[")) {
        let newArray: Array<any> = [];
        const newGiven: Array<any> = given as Array<any>;
        if (
          typeof found === "object" &&
          JSON.stringify(found).startsWith("[")
        ) {
          newGiven.forEach((element) => {
            newArray.push(found.find((val) => val === element));
          });
        } else {
          fail(key, "Contain:Array");
          console.log(
            chalk.red(`expected array but found ${typeof found} \n `),
            chalk.green(`given :- ${given} \n`),
            chalk.red(`found :- ${found} \n `)
          );
        }
        if (JSON.stringify(given) === JSON.stringify(newArray)) {
          pass(key, "Contain:Array");
        } else {
          fail(key, "Contain:Array");
          console.log(
            chalk.green(`given :- ${given} \n`),
            chalk.red(`found :- ${found} \n`)
          );
        }
      } else if (
        typeof given === "object" &&
        JSON.stringify(found).startsWith("{")
      ) {
        const newGiven: Object = given;

        if (
          typeof found === "object" &&
          JSON.stringify(found).startsWith("{")
        ) {
          let i: number = 0;
          for (let objKey in newGiven) {
            if (newGiven[objKey] === found[objKey]) {
              i++;
            }
          }
          if (Object.keys(newGiven).length === i) {
            pass(key, "Contain:Object");
          } else {
            fail(key, "Contain:Object");
            console.log(
              chalk.green(`given :-\n${JSON.stringify(given, null, " ")} \n`),
              chalk.red(`found :-\n${JSON.stringify(found, null, " ")} \n`)
            );
          }
        } else {
          fail(key, "Contain:Object");
          console.log(
            chalk.red(`expected object but found ${typeof found} \n `),
            chalk.green(`given :-\n${JSON.stringify(given, null, " ")} `),
            chalk.red(`found :-\n${JSON.stringify(found, null, " ")} \n`)
          );
        }
      }
      return found;
    };
    return descriptor;
  };
}
