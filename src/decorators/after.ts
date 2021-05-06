export function After(): Function {
  return function (
    target: Object,
    key: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    global.after = key;
    global.utility.delete(key);
    global.toRun.delete(key);
    return descriptor;
  };
}
