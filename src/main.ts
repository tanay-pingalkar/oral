// all exports
export { Equal } from "./decorators/equal";
export { True } from "./decorators/true";
export { Match } from "./decorators/match";
export { False } from "./decorators/false";
export { Contain } from "./decorators/contain";

import { argParser } from "./utils/argparser";
import { finalConfig } from "./utils/finalConfig";
import { testFiles } from "./utils/testFiles";
import { testRunner } from "./utils/testRunner";
import chokidar from "chokidar";
import chalk from "chalk";

// this is default configuration
global.Config = {
  testFiles: [],
  silent: false,
  watch: false,
  coverageDir: "/",
  testDir: "/",
  watchDir: "./",
};

export const oral = (args: Array<any>) => {
  args = argParser(args);
  // confirms config based on arguments in cli and configuration file
  finalConfig(args);
  // find .test.ts files and push it location to global.Config.testFiles
  testFiles();

  if (global.Config.watch) {
    /* watch mode logic*/
    testRunner();
    console.log(chalk.blue("+----------------watchmode-------------------+"));
    const watcher = chokidar.watch(process.cwd() + "/", {
      ignored: /node_modules/g,
      ignoreInitial: true,
    });
    watcher.on("all", async (path) => {
      testFiles();
      testRunner();
      console.log(chalk.blue("+----------------------------------------+"));
    });
  } else {
    // run all the tests at once
    testRunner();
  }
};
