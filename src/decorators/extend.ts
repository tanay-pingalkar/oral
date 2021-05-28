function resolver(
  this: any,
  found: any,
  func: (found: any) => boolean,
  key: string,
  name: string
): void {
  const res = func(found);
  if (res) this.emit("pass", key, name);
  else this.emit("fail", key, name);
}

export function Extend(name: string, func: (found: any) => boolean): Function {
  return function (
    target: Object,
    key: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const original = descriptor.value;
    Reflect.defineMetadata("role", "assertion", target, key);
    descriptor.value = function (...args: any[]) {
      const found = original.apply(this, args);
      if (found) {
        if (found.constructor.name === "Promise") {
          found.then((found: any) =>
            resolver.apply(this, [found, func, found, key, name])
          );
        } else resolver.apply(this, [found, func, found, key, name]);
      }
      return found;
    };
    return descriptor;
  };
}
