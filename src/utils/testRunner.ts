import "reflect-metadata";
import "ts-node/register";

const lol = new Set<string>([
  "__defineGetter__",
  "__defineSetter__",
  "hasOwnProperty",
  "__lookupGetter__",
  "__lookupSetter__",
  "isPrototypeOf",
  "propertyIsEnumerable",
  "toString",
  "valueOf",
  "__proto__",
  "toLocaleString",
  "constructor",
]);
function getAllMethodNames(obj) {
  let methods = [];
  while ((obj = Reflect.getPrototypeOf(obj))) {
    let keys = Reflect.ownKeys(obj);
    keys.forEach((k) => {
      if (!lol.has(k as string)) methods.push(k as string);
    });
  }
  return methods;
}

export const testRunner = () => {
  const testFiles = global.Config.testFiles;
  testFiles.forEach((fileName) => {
    const imported = require(fileName);
    for (let key in imported) {
      const test = new imported[key]();
      const methods = getAllMethodNames(test);
      methods.forEach((value) => {
        test[value]();
      });
    }
    delete require.cache[require.resolve(fileName)];
  });
};
