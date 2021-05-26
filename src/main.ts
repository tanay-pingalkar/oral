export { Equal } from "./decorators/equal";
export { True } from "./decorators/true";
export { Match } from "./decorators/match";
export { False } from "./decorators/false";
export { Contain } from "./decorators/contain";
export { Suite } from "./decorators/suit";
export { GreaterThan } from "./decorators/greaterThan";
export { LessThan } from "./decorators/lessThan";
export { Util } from "./decorators/util";
export { BeforeAll } from "./decorators/before";
export { AfterAll } from "./decorators/after";
export { Typeof } from "./decorators/typeof";
export { Instanceof } from "./decorators/instanceof";
export { Extend } from "./decorators/extend";
export { BeforeEach } from "./decorators/beforeEach";
export { AfterEach } from "./decorators/afterEach";
export { Test } from "./decorators/test";

import { argParser } from "./utils/argparser";
import { Oral } from "./oral";
import { argsReturn } from "./global";

export const oral = (args: Array<string>) => {
  const resolved_args: argsReturn = argParser(args);
  new Oral(resolved_args);
};
