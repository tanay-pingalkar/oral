export const centerString = (base: Array<string>, max: number): string => {
  const space = (max - base.length) / 2;
  for (let i = 0; i <= space; i++) {
    base.push(" ");
  }
  for (let i = 0; i <= space; i++) {
    base.unshift(" ");
  }
  return base.join("");
};
