// all exports
export { Equal } from "./decorators/equal";
export { True } from "./decorators/true";
export { Match } from "./decorators/match";
export { False } from "./decorators/false";
export { Contain } from "./decorators/contain";
export { Suit } from "./decorators/suit";
export { GreaterThan } from "./decorators/greaterThan";
export { LessThan } from "./decorators/lessThan";

import { argParser } from "./utils/argparser";
import { finalConfig } from "./utils/finalConfig";
import { testFiles } from "./utils/testFiles";
import { testRunner } from "./utils/testRunner";
import chokidar from "chokidar";
import chalk from "chalk";
import { centerString } from "./utils/centerString";

// this is default configuration
global.Config = {
  testFiles: [],
  silent: false,
  watch: false,
  coverageDir: "/",
  testDir: "/",
  watchDir: "/",
};

global.tests = [];

export const oral = (args: Array<string>) => {
  args = argParser(args);
  // confirms config based on arguments in cli and configuration file
  finalConfig(args);
  // find .test.ts files and push it location to global.Config.testFiles
  testFiles();

  if (global.Config.watch) {
    /* watch mode logic*/

    testRunner();
    console.log(chalk.bgGrey(centerString("watchmode on".split(""), 50)));
    const watcher = chokidar.watch(process.cwd() + global.Config.watchDir, {
      ignored: /node_modules/g,
      ignoreInitial: true,
    });
    watcher.on("all", async (path) => {
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
