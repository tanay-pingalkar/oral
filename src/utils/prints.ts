import chalk from "chalk";

export const keyToString = (key: string): string => {
  let str = [];
  const splittedKey = key.split("");
  splittedKey.forEach((val, i) => {
    if (isNaN(parseInt(splittedKey[i - 1])) && /[0-9]/g.test(val)) {
      val = "_" + val.toLowerCase();
    }
    if (/[A-Z]/g.test(val)) {
      val = "_" + val.toLowerCase();
    }
    str.push(val);
  });
  return str.join("").replace(/_/g, " ");
};

export const pass = (key: string, name: string) => {
  console.log(
    chalk.bgGreen(chalk.black(chalk.bold(" pass "))) +
      " " +
      keyToString(key) +
      " " +
      chalk.bold(`${chalk.cyan("[")}${name}${chalk.cyan("]")}`)
  );
};

export const fail = (key: string, name: string) => {
  console.log(
    chalk.bgRed(chalk.black(chalk.bold(" fail "))) +
      " " +
      keyToString(key) +
      " " +
      chalk.bold(`${chalk.cyan("[")}${name}${chalk.cyan("]")}`)
  );
};
