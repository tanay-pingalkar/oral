export function AfterEach(): Function {
  return function (
    target: Object,
    key: string,
    descriptor: PropertyDescriptor
  ): void {
    Reflect.defineMetadata("role", "afterEach", target, key);
  };
}
