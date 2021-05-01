import "ts-node/register";

export const finalConfig = (args: any): void => {
  let configFile: Object;
  if (args._.length !== 0) {
    configFile = require(process.cwd() + args._[0] + "./oral.config.ts");
  } else {
    configFile = require(process.cwd() + "/oral.config.ts");
  }

  for (let key in configFile) {
    if (global.Config[key] !== undefined) global.Config[key] = configFile[key];
    else {
      console.log(key + " is not a valid configuration");
      process.exit();
    }
  }
  for (let key in args) {
    if (global.Config[key.slice(2)] !== undefined) {
      global.Config[key.slice(2)] = args[key];
    }
  }
};
