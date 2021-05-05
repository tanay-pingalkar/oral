import arg from "arg";

export const argParser = (args: Array<string>): any => {
  const parser = arg(
    {
      "--help": Boolean,
      "--version": Boolean,
      "--testDir": String,
      "--coverageDir": String,
      "--watch": Boolean,
      "--silent": Boolean,
      "--coverage": Boolean,
      "--watchDir": String,
      "--clear": Boolean,
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
