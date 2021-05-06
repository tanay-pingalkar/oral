export const Add = (key: string) => {
  if (
    !global.utility.has(key) ||
    global.after !== key ||
    global.before !== key
  ) {
    global.toRun.add(key);
  }
};
