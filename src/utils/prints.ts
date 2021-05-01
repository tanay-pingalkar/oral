import chalk from "chalk";

export const pass = (name: string) => {
  console.log(chalk.bgGreen(chalk.black(chalk.bold(" pass "))) + " " + name);
};

export const fail = (name: string) => {
  console.log(chalk.bgRed(chalk.black(chalk.bold("\n fail "))) + " " + name);
};
