import EventEmitter from "events";
import { Mixin } from "ts-mixer";

export function Suite(description?: string): Function {
  function whatDescription(constructor: string): string {
    let res: string;
    if (description) {
      res = description;
    } else res = constructor;
    return res;
  }
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    let assertions: Set<symbol> = new Set([]);
    let utils: Set<symbol> = new Set([]);
    let beforeEach: symbol = null;
    let afterEach: symbol = null;
    let beforeAll: symbol = null;
    let afterAll: symbol = null;
    let obj: object = new constructor();
    let methods: Array<symbol> = [];

    while ((obj = Reflect.getPrototypeOf(obj))) {
      let keys = Reflect.ownKeys(obj) as symbol[];
      keys.forEach((key) => {
        const role = Reflect.getMetadata("role", obj, key);
        switch (role) {
          case "util":
            utils.add(key);
            break;

          case "assertion":
            assertions.add(key);
            break;

          case "beforeAll":
            beforeAll = key;
            break;

          case "afterAll":
            afterAll = key;
            break;

          case "beforeEach":
            beforeEach = key;

          case "afterEach":
            afterEach = key;
            break;
        }
      });
    }
    return class extends Mixin(constructor, EventEmitter) {
      suiteName = whatDescription(constructor.name);
      assertions = assertions;
      utils = utils;
      beforeAll = beforeAll;
      afterAll = afterAll;
      beforeEach = beforeEach;
      afterEach = afterEach;

      constructor(...args) {
        super(...args);
      }
    };
  };
}
