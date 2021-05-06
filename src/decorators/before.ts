export function Before(): Function {
  return function (
    target: Object,
    key: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    global.before = key;
    global.utility.delete(key);
    global.toRun.delete(key);
    return descriptor;
  };
}
