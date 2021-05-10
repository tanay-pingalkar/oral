export function AfterEach(): Function {
  return function (
    target: Object,
    key: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    global.afterEach = key;
    global.utility.delete(key);
    global.toRun.delete(key);
    return descriptor;
  };
}
