export function AfterAll(): Function {
  return function (
    target: Object,
    key: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    Reflect.defineMetadata("role", "afterAll", target, key);
    return descriptor;
  };
}
