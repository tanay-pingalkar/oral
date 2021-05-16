export function BeforeAll(): Function {
  return function (
    target: Object,
    key: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    Reflect.defineMetadata("role", "beforeAll", target, key);
    return descriptor;
  };
}
