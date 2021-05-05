export function Util(): Function {
  return function (
    target: Object,
    key: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    global.toRun.delete(key);
    global.utility.add(key);
    return descriptor;
  };
}
