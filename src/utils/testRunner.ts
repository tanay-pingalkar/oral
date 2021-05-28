import chalk from "chalk";
import "reflect-metadata";
import "ts-node/register";
import { centerString } from "./centerString";
import { suit, testInfo } from "../global";
import { testsInfo } from "./testInfo";
import { Runner } from "./runner";
const notifier = require("node-notifier");

export class TestRunner {
  imported: Array<object> = [];
  result: Array<suit> = [];
  globalObject: any;

  get testInfo(): testInfo {
    return testsInfo(this.result);
  }

  capsules: Array<Runner> = [];
  constructor(public files: Set<string>) {
    this.prologue();
    this.requireAndRun(this.files).then(() => {
      this.climax();
    });
  }

  prologue() {
    if (global.Config.beforeEveryone) {
      this.globalObject = global.Config.beforeEveryone();
    }
  }

  async requireAndRun(files: Set<string> = this.files) {
    for (const file of files.values()) {
      const required = require(file);
      this.imported.push(required);
      for (const obj in required) {
        if (typeof required[obj] === "function") {
          const runningCapsule = new Runner(required[obj], this.globalObject);
          await runningCapsule.runAllAssertions();
          this.capsules.push(runningCapsule);
          this.result.push(runningCapsule.info());
        }
      }
    }
  }

  climax() {
    console.log(
      chalk.bgCyan.black.bold(centerString("🎉 all tests are done 🎉", 50))
    );
    const { suits, tests, passed, failed } = this.testInfo;
    console.log(chalk.bold.cyan(`\n💼 total suites:${suits}`));
    console.log(chalk.bold(`\n📝 total tests:${tests}`));
    console.log(chalk.blue.bold("\n✅ passed tests") + chalk.blue.bold(passed));
    console.log(
      chalk.redBright.italic("\n❎ failed tests:") + chalk.red.bold(failed)
    );
    this.notify();
    this.postClimaxCleaningCache();
  }

  notify() {
    const { suits, tests, passed, failed } = this.testInfo;
    if (global.Config.notify) {
      notifier.notify({
        title: "🎉 all tests are done 🎉",
        message: `\n💼 total suites:${suits} \n📝  total tests:${tests} \n ✅ passed tests:${passed} \❎  failed tests:${failed}\n `,
        sound: true,
      });
    }
  }

  postClimaxCleaningCache() {
    for (const file of this.files.values()) {
      delete require.cache[file];
    }
    this.imported = [];
    this.result = [];
  }
}
