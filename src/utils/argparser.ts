import arg from "arg";

export const argParser = (args: Array<string>): any => {
  const parser = arg(
    {
      "--tsconfig": String,
      "--help": Boolean,
      "--version": Boolean,
      "--testDir": String,
      "--coverageDir": String,
      "--watch": Boolean,
      "--silent": Boolean,
      "--coverage": Boolean,
      "--watchDir": String,
      "--clear": Boolean,
      "--noclear": Boolean,
      "--nonotify": Boolean,
      "-C": "--clear",
      "-W": "--watch",
      "-V": "--version",
      "-H": "--help",
      "-S": "--silent",
    },
    {
      argv: args.splice(2),
    }
  );
  return parser;
};
