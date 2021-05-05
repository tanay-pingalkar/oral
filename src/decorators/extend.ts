import { Add } from "../utils/add";
import { fail, pass } from "../utils/prints";

export function Extend(name: string, func: Function): Function {
  return function (
    target: Object,
    key: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const original = descriptor.value;
    Add(key);
    descriptor.value = function (...args: any[]) {
      const found = original.apply(this, args);
      const ans = func(found);
      if (ans) {
        pass(key, name, target);
      } else {
        fail(key, name, target);
      }
      return found;
    };
    return descriptor;
  };
}
