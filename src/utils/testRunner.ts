import chalk from "chalk";
import "reflect-metadata";
import "ts-node/register";
import { centerString } from "./centerString";
import { testsInfo } from "./testInfo";
import { performance } from "perf_hooks";

// const lol = new Set<string | symbol>([
//   "__defineGetter__",
//   "__defineSetter__",
//   "hasOwnProperty",
//   "__lookupGetter__",
//   "__lookupSetter__",
//   "isPrototypeOf",
//   "propertyIsEnumerable",
//   "toString",
//   "valueOf",
//   "__proto__",
//   "toLocaleString",
//   "constructor",
//   "index",
//   "tests",
// ]);
// function getAllMethodNames(obj: Object | null): Array<string | symbol> {
//   let methods: Array<string | symbol> = [];
//   while ((obj = Reflect.getPrototypeOf(obj))) {
//     let keys = Reflect.ownKeys(obj);
//     keys.forEach((k) => {
//       if (!lol.has(k) && !k.toString().startsWith("util_")) methods.push(k);
//     });
//   }
//   return methods;
// }

export const testRunner = () => {
  const testFiles = global.Config.testFiles;
  const t0 = performance.now();
  testFiles.forEach((fileName) => {
    global.toRun = new Set([]);
    global.utility = new Set([]);
    const imported = require(fileName);
    for (let key in imported) {
      const test = new imported[key]();
      test["log"]();
      global.toRun.forEach((value) => {
        if (test[value]) test[value]();
      });
    }
    delete require.cache[require.resolve(fileName)];
  });
  const t1 = performance.now();
  console.log(
    chalk.bgCyan.black.bold(
      centerString("🎉 all tests are done 🎉".split(""), 50)
    )
  );
  const { suits, tests, passed, failed } = testsInfo();
  console.log(`\n💼 ${chalk.bold.cyan(`total suites:${suits}`)}`);
  console.log(`\n📝 ${chalk.bold(`total tests:${tests}`)}`);
  console.log(
    `\n✅ ${chalk.blue.bold("passed tests")}:${chalk.blue.bold(passed)}`
  );
  console.log(
    `\n❎ ${chalk.redBright.italic("failed tests:")}${chalk.red.bold(failed)}`
  );
  console.log(
    `\n🕑 ${chalk.blue.bold("time taken:")}${chalk.blue.bold(
      Math.round(t1 - t0) + "ms"
    )}\n`
  );
};
