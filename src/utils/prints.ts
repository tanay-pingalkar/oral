import chalk from "chalk";

export const pass = (key: string, name: string) => {
  console.log(
    chalk.bgGreen(chalk.black(chalk.bold(" pass "))) +
      " " +
      key +
      " " +
      chalk.bold(`${chalk.cyan("[")}${name}${chalk.cyan("]")}`)
  );
};

export const fail = (key: string, name: string) => {
  console.log(
    chalk.bgRed(chalk.black(chalk.bold(" fail "))) +
      " " +
      key +
      " " +
      chalk.bold(`${chalk.cyan("[")}${name}${chalk.cyan("]")}`)
  );
};
