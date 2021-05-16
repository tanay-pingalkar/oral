export function BeforeEach(): Function {
  return function (
    target: Object,
    key: string,
    descriptor: PropertyDescriptor
  ): void {
    Reflect.defineMetadata("role", "beforeEach", target, key);
  };
}
