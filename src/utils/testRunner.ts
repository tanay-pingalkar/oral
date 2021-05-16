import chalk from "chalk";
import "reflect-metadata";
import "ts-node/register";
import { centerString } from "./centerString";
import { performance } from "perf_hooks";
import EventEmitter from "events";
import { fail, pass } from "./prints";
import { suit } from "../global";
import { testsInfo } from "./testInfo";
const notifier = require("node-notifier");

export class TestRunner {
  files: Set<string>;
  imported: Array<object> = [];
  result: Array<suit> = [];
  capsules: Array<Runner> = [];
  constructor(files: Set<string>) {
    this.files = files;
    this.requireAndRun(this.files);
    this.climax();
  }

  requireAndRun(files: Set<string> = this.files) {
    for (const file of files.values()) {
      const required = require(file);
      this.imported.push(required);
      for (const obj in required) {
        const runningCapsule = new Runner(required[obj]);
        this.capsules.push(runningCapsule);
        this.result.push(runningCapsule.info());
      }
    }
  }

  climax() {
    console.log(
      chalk.bgCyan.black.bold(centerString("🎉 all tests are done 🎉", 50))
    );
    const { suits, tests, passed, failed } = testsInfo(this.result);
    console.log(chalk.bold.cyan(`\n💼 total suites:${suits}`));
    console.log(chalk.bold(`\n📝 total tests:${tests}`));
    console.log(chalk.blue.bold("\n✅ passed tests") + chalk.blue.bold(passed));
    console.log(
      chalk.redBright.italic("\n❎ failed tests:") + chalk.red.bold(failed)
    );
    this.postClimaxCleaningCache();
  }
  postClimaxCleaningCache() {
    for (const file of this.files.values()) {
      delete require.cache[file];
    }
    this.imported = [];
    this.result = [];
  }
}

export class Runner extends EventEmitter {
  assertions: Set<string> = new Set([]);
  suitName: string;
  beforeAll = () => {};
  afterAll = () => {};
  beforeEach = () => {};
  afterEach = () => {};
  passed: Array<string> = [];
  failed: Array<string> = [];
  obj: any;
  construct: any;
  constructor(object: any) {
    super();
    this.construct = object;
    this.configure();
    this.runAllAssertions();
  }

  configure() {
    const obj = new this.construct();
    console.log(
      chalk.bold.bgMagentaBright.black(centerString(obj.suiteName, 50))
    );
    this.obj = obj;
    this.assertions = obj.assertions;
    this.suitName = obj.suitName;

    if (obj.beforeAll) this.beforeAll = obj[obj.beforeAll];
    if (obj.afterAll) this.afterAll = obj[obj.afterAll];
    if (obj.beforeEach) this.beforeEach = obj[obj.beforeEach];
    if (obj.afterEach) this.afterAll = obj[obj.afterEach];

    obj.on("pass", (key: string, tag: string) => {
      this.passed.push(key);
      pass(key, tag);
    });
    obj.on("fail", (key: string, tag: string) => {
      this.failed.push(key);
      fail(key, tag);
    });
  }

  runAllAssertions() {
    this.beforeAll();
    this.obj.assertions.forEach((key) => {
      this.beforeEach();
      this.obj[key]();
      this.afterEach();
    });
    this.afterAll();
  }

  info(): suit {
    return {
      passed: this.passed.length,
      failed: this.failed.length,
      name: this.suitName,
    };
  }
}

// export const testRunner = () => {
//   const config = require(process.cwd() + global.Config.tsconfig);
//   create(config);
//   const testFiles = global.Config.testFiles;

//   const t0 = performance.now();
//   let globalObject: any;
//   if (global.Config.beforeEveryone) {
//     globalObject = global.Config.beforeEveryone();
//   }

//   for (let fileName of testFiles) {
//     global.toRun = new Set([]);
//     global.utility = new Set([]);
//     global.before = null;
//     global.after = null;
//     global.beforeEach = null;
//     global.afterEach = null;

//     const imported = require(fileName);

//     for (let key in imported) {
//       let test: any;
//       if (imported[key].length >= 1) test = new imported[key](globalObject);
//       else test = new imported[key]();
//       test["log"]();
//       if (global.before) test[global.before]();
//       global.toRun.forEach((value) => {
//         if (global.beforeEach) test[global.beforeEach]();
//         if (test[value]) test[value]();
//         if (global.afterEach) test[global.afterEach]();
//       });
//       if (global.after) test[global.after]();
//     }
//     // delete require.cache[require.resolve(fileName)];
//   }
//   if (global.Config.afterEveryone) global.Config.afterEveryone();
//   const t1 = performance.now();
//   console.log(
//     chalk.bgCyan.black.bold(
//       centerString("🎉 all tests are done 🎉".split(""), 50)
//     )
//   );
//   const { suits, tests, passed, failed } = testsInfo();
//   console.log(`\n💼 ${chalk.bold.cyan(`total suites:${suits}`)}`);
//   console.log(`\n📝 ${chalk.bold(`total tests:${tests}`)}`);
//   console.log(
//     `\n✅ ${chalk.blue.bold("passed tests")}:${chalk.blue.bold(passed)}`
//   );
//   console.log(
//     `\n❎ ${chalk.redBright.italic("failed tests:")}${chalk.red.bold(failed)}`
//   );
//   console.log(
//     `\n🕑 ${chalk.blue.bold("time taken:")}${chalk.blue.bold(
//       Math.round(t1 - t0) + "ms"
//     )}\n`
//   );
//   if (!global.Config.nonotify) {
//     notifier.notify({
//       title: "🎉 all tests are done 🎉",
//       message: `\n💼 total suites:${suits} \n📝  total tests:${tests} \n ✅ passed tests:${passed} \❎  failed tests:${failed}\n 🕑 time taken:${Math.round(
//         t1 - t0
//       )}ms`,
//       sound: true,
//     });
//   }
// };
