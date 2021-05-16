import "reflect-metadata";

export function Util(): Function {
  return function <T>(
    target: object,
    key: string,
    descriptor: TypedPropertyDescriptor<T>
  ) {
    Reflect.defineMetadata("role", "util", target, key);
  };
}
