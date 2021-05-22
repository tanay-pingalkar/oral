import arg from "arg";
import { argsReturn } from "../global";

export const argParser = (args: Array<string>): argsReturn => {
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
      "--notify": Boolean,
      "--file": String,
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
