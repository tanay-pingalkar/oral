import path from "path";
import "ts-node/register";
import { argsReturn, config } from "../global";

export const finalConfig = (args: argsReturn, Config: config): config => {
  let configFile: Object;
  if (args._.length !== 0) {
    configFile = require(path.join(process.cwd(), args._[0]));
  } else {
    configFile = require(path.join(process.cwd(), "/oral.config.ts"));
  }

  for (let key in configFile) {
    if (Config[key] !== undefined) Config[key] = configFile[key];
    else {
      console.log(key + " is not a valid configuration");
      process.exit();
    }
  }

  for (let key in args) {
    if (Config[key.slice(2)] !== undefined) {
      Config[key.slice(2)] = args[key];
    }
  }

  return Config;
};
