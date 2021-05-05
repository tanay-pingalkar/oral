export const basicArg = (args: any): boolean => {
  if (args["--version"] === true) {
    console.log("👉 @ral v0.0.0 beta");
    return true;
  } else if (args["--help"] === true) {
    console.log("this is help");
    return true;
  }
  return false;
};
