export const centerString = (string: string, max: number): string => {
  let base = string.split("");
  const space = (max - base.length) / 2;
  for (let i = 0; i <= space; i++) {
    base.push(" ");
  }
  for (let i = 0; i <= space; i++) {
    base.unshift(" ");
  }
  if (base.length != max + 2) {
    base.push(" ");
  }
  return base.join("");
};
