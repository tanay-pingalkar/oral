export { Equal } from "./decorators/equal";
export { True } from "./decorators/true";
export { Match } from "./decorators/match";
export { False } from "./decorators/false";

import { argParser } from "./utils/argparser";
import { finalConfig } from "./utils/finalConfig";
import { testFiles } from "./utils/testFiles";
import { testRunner } from "./utils/testRunner";
import chokidar from "chokidar";
import path from "path";
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
  finalConfig(args);
  testFiles();
  if (global.Config.watch) {
    const watcher = chokidar.watch(process.cwd() + "/", {
      ignored: /node_modules/g,
    });
    watcher.on("all", async (path) => {
      testRunner();
    });
  } else {
    testRunner();
  }
};
