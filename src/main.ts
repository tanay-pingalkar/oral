// all exports
export { Equal } from "./decorators/equal";
export { True } from "./decorators/true";
export { Match } from "./decorators/match";
export { False } from "./decorators/false";
export { Contain } from "./decorators/contain";
export { Suite } from "./decorators/suit";
export { GreaterThan } from "./decorators/greaterThan";
export { LessThan } from "./decorators/lessThan";
export { Util } from "./decorators/util";
export { Before } from "./decorators/before";
export { After } from "./decorators/after";
export { Typeof } from "./decorators/typeof";
export { Instanceof } from "./decorators/instanceof";
export { Extend } from "./decorators/extend";

import { argParser } from "./utils/argparser";
import { finalConfig } from "./utils/finalConfig";
import { testFiles } from "./utils/testFiles";
import { testRunner } from "./utils/testRunner";
import chokidar from "chokidar";
import chalk from "chalk";
import { centerString } from "./utils/centerString";
import { basicArg } from "./utils/basicArgs";

// this is default configuration
global.Config = {
  testFiles: [],
  silent: false,
  watch: false,
  coverageDir: "/",
  testDir: "/",
  watchDir: "/",
  clear: false,
  noclear: false,
  beforeEveryone: null,
  afterEveryone: null,
  nonotify: false,
};

global.tests = [];

export const oral = (args: Array<string>) => {
  args = argParser(args);

  if (basicArg(args)) return;
  // confirms config based on arguments in cli and configuration file
  finalConfig(args);

  // prettier-ignore
  if (global.Config.clear) process.stdout.write('\x1Bc');
  // find .test.ts files and push it location to global.Config.testFiles
  testFiles();

  if (global.Config.watch) {
    /* watch mode logic*/
    if (!global.Config.noclear) process.stdout.write("\x1Bc");
    testRunner();
    console.log(chalk.bgGrey(centerString("watchmode on".split(""), 50)));
    const watcher = chokidar.watch(process.cwd() + global.Config.watchDir, {
      ignored: /node_modules/g,
      ignoreInitial: true,
    });
    watcher.on("change", async (path) => {
      console.clear();
      global.tests = [];
      testRunner();
      console.log(
        chalk.bgGrey(centerString("watching for changes".split(""), 50))
      );
    });
    watcher.on("add", () => {
      console.clear();
      global.Config.testFiles = [];
      global.tests = [];
      testFiles();
      testRunner();
      console.log(
        chalk.bgGrey(centerString("watching for changes".split(""), 50))
      );
    });
    watcher.on("unlink", () => {
      console.clear();
      global.Config.testFiles = [];
      global.tests = [];
      testFiles();
      testRunner();
      console.log(
        chalk.bgGrey(centerString("watching for changes".split(""), 50))
      );
    });
  } else {
    // run all the tests at once
    testRunner();
  }
};
