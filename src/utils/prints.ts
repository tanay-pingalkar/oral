import chalk from "chalk";

export const pass = (key: string, name: string, target: Object) => {
  global.tests[target["index"]].passed =
    global.tests[target["index"]].passed + 1;
  console.log(
    chalk.bgGreen(chalk.black(chalk.bold(" pass "))) +
      " " +
      key +
      " " +
      chalk.bold(`${chalk.cyan("[")}${name}${chalk.cyan("]")}`)
  );
};

export const fail = (key: string, name: string, target: Object) => {
  global.tests[target["index"]].failed =
    global.tests[target["index"]].failed + 1;
  console.log(
    chalk.bgRed(chalk.black(chalk.bold(" fail "))) +
      " " +
      key +
      " " +
      chalk.bold(`${chalk.cyan("[")}${name}${chalk.cyan("]")}`)
  );
};
