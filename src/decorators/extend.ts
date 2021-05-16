export function Extend(name: string, func: (any) => boolean): Function {
  return function (
    target: Object,
    key: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const original = descriptor.value;
    Reflect.defineMetadata("role", "assertion", target, key);
    descriptor.value = function (...args: any[]) {
      const found = original.apply(this, args);
      const res = func(found);
      if (res) this.emit("pass", key, name);
      else this.emit("fail", key, name);
      return found;
    };
    return descriptor;
  };
}
