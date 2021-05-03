import chalk from "chalk";
import "reflect-metadata";
import "ts-node/register";
import { centerString } from "./centerString";
import { testsInfo } from "./testInfo";

const lol = new Set<string | symbol>([
  "__defineGetter__",
  "__defineSetter__",
  "hasOwnProperty",
  "__lookupGetter__",
  "__lookupSetter__",
  "isPrototypeOf",
  "propertyIsEnumerable",
  "toString",
  "valueOf",
  "__proto__",
  "toLocaleString",
  "constructor",
  "index",
]);
function getAllMethodNames(obj: Object | null): Array<string | symbol> {
  let methods: Array<string | symbol> = [];
  while ((obj = Reflect.getPrototypeOf(obj))) {
    let keys = Reflect.ownKeys(obj);
    keys.forEach((k) => {
      if (!lol.has(k) && !k.toString().startsWith("util_")) methods.push(k);
    });
  }
  return methods;
}

export const testRunner = () => {
  const testFiles = global.Config.testFiles;
  testFiles.forEach((fileName) => {
    const imported = require(fileName);
    for (let key in imported) {
      const test = new imported[key]();
      const methods = getAllMethodNames(test);
      methods.forEach((value) => {
        test[value]();
      });
    }
    delete require.cache[require.resolve(fileName)];
  });
  console.log(
    chalk.bgCyan.black.bold(
      centerString("🎉 all tests are done 🎉".split(""), 50)
    )
  );
  const { suits, tests, passed, failed } = testsInfo();
  console.log(`\n💼 ${chalk.bold.cyan(`all suits:${suits}`)}`);
  console.log(`\n📝 ${chalk.bold(`all tests:${tests}`)}`);
  console.log(
    `\n✅ ${chalk.blue.bold("passed tests")}:${chalk.blue.bold(passed)}`
  );
  console.log(
    `\n❎ ${chalk.redBright.italic("failed tests:")}${chalk.red.bold(failed)}\n`
  );
};
