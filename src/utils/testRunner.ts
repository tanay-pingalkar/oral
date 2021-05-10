import chalk from "chalk";
import "reflect-metadata";
import { create } from "ts-node";
import { centerString } from "./centerString";
import { testsInfo } from "./testInfo";
import { performance } from "perf_hooks";
const notifier = require("node-notifier");

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
  const config = require(process.cwd() + global.Config.tsconfig);
  create(config);
  const testFiles = global.Config.testFiles;

  const t0 = performance.now();
  let globalObject: any;
  if (global.Config.beforeEveryone) {
    globalObject = global.Config.beforeEveryone();
  }

  for (let fileName of testFiles) {
    global.toRun = new Set([]);
    global.utility = new Set([]);
    global.before = null;
    global.after = null;
    global.beforeEach = null;
    global.afterEach = null;

    const imported = require(fileName);

    for (let key in imported) {
      let test: any;
      if (imported[key].length >= 1) test = new imported[key](globalObject);
      else test = new imported[key]();
      test["log"]();
      if (global.before) test[global.before]();
      global.toRun.forEach((value) => {
        if (global.beforeEach) test[global.beforeEach]();
        if (test[value]) test[value]();
        if (global.afterEach) test[global.afterEach]();
      });
      if (global.after) test[global.after]();
    }
    // delete require.cache[require.resolve(fileName)];
  }
  if (global.Config.afterEveryone) global.Config.afterEveryone();
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
  if (!global.Config.nonotify) {
    notifier.notify({
      title: "🎉 all tests are done 🎉",
      message: `\n💼 total suites:${suits} \n📝  total tests:${tests} \n ✅ passed tests:${passed} \❎  failed tests:${failed}\n 🕑 time taken:${Math.round(
        t1 - t0
      )}ms`,
      sound: true,
    });
  }
};
