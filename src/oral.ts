import chalk from "chalk";
import path from "path";
import defaultConfig from "./defaultConfig";
import { argsReturn, config } from "./global";
import { centerString } from "./utils/centerString";
import { finalConfig } from "./utils/finalConfig";
import { testFiles } from "./utils/testFiles";
import { TestRunner } from "./utils/testRunner";
import chokidar from "chokidar";

export class Oral {
  args: argsReturn;
  config: config = defaultConfig;
  allTestFiles: Set<string>;

  testRunner: TestRunner;
  constructor(args: argsReturn) {
    this.args = args;
    this.finalConfig();
    this.CollectAllTestFiles();
    this.beforeAllTest();
    this.RunAllTests();
    if (this.config.watch) {
      this.watcher();
    }
  }

  RunAllTests() {
    this.testRunner = new TestRunner(this.allTestFiles);
  }

  CollectAllTestFiles(): Set<string> {
    this.allTestFiles = testFiles(
      path.join(process.cwd(), this.config.testDir)
    );
    return this.allTestFiles;
  }

  finalConfig(): config {
    this.config = finalConfig(this.args, this.config);
    /*
    !using global variables is bad and lacks confidence, but I have not idea for global.Config
    !, we cannot avoig global.Config variable but we can ensure that global.Config can change
    !at this place, please dont change value of global.Config anywhere.
    */
    global.Config = this.config;
    return this.config;
  }

  beforeAllTest() {
    if (this.config.clear) {
      process.stdout.write("\x1Bc");
    }
  }

  watcher() {
    console.log(chalk.bgGrey(centerString("watchmode on", 50)));
    const watcher = chokidar.watch(process.cwd() + global.Config.watchDir, {
      ignored: /node_modules/g,
      ignoreInitial: true,
    });
    watcher.on("change", async (path) => {
      console.clear();
      this.testRunner.requireAndRun();
      this.testRunner.climax();
      console.log(chalk.bgGrey(centerString("watching for changes", 50)));
    });
    watcher.on("add", () => {
      console.clear();
      const new_files = this.CollectAllTestFiles();
      this.testRunner.requireAndRun(new_files);
      this.testRunner.climax();
      console.log(chalk.bgGrey(centerString("watching for changes", 50)));
    });
    watcher.on("unlink", () => {
      console.clear();
      const new_files = this.CollectAllTestFiles();
      this.testRunner.requireAndRun(new_files);
      this.testRunner.climax();
      console.log(chalk.bgGrey(centerString("watching for changes", 50)));
    });
  }
}
