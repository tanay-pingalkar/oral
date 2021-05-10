export function BeforeEach(): Function {
  return function (
    target: Object,
    key: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    global.beforeEach = key;
    global.utility.delete(key);
    global.toRun.delete(key);
    return descriptor;
  };
}
