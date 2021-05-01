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
    },
    {
      argv: args.splice(2),
    }
  );
  return parser;
};
