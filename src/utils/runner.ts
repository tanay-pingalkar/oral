import chalk from "chalk";
import EventEmitter from "events";
import { suit } from "../global";
import { centerString } from "./centerString";
import { pass, fail } from "./prints";

export class Runner extends EventEmitter {
  assertions: Set<string> = new Set([]);
  suitName: string;
  beforeAll = () => {};
  afterAll = () => {};
  beforeEach = () => {};
  afterEach = () => {};
  passed: Array<string> = [];
  failed: Array<string> = [];
  obj: any;
  construct: any;

  constructor(object: any) {
    super();
    this.construct = object;
    this.configure();
    this.runAllAssertions();
  }

  configure(): void | "not a suite" {
    const obj = new this.construct();
    this.obj = obj;
    this.assertions = obj.assertions;
    this.suitName = obj.suiteName;

    console.log(
      chalk.bold.bgMagentaBright.black(centerString(this.suitName, 50))
    );

    if (obj.beforeAll) this.beforeAll = obj[obj.beforeAll];
    if (obj.afterAll) this.afterAll = obj[obj.afterAll];
    if (obj.beforeEach) this.beforeEach = obj[obj.beforeEach];
    if (obj.afterEach) this.afterAll = obj[obj.afterEach];

    obj.on("pass", (key: string, tag: string) => {
      this.passed.push(key);
      pass(key, tag);
    });
    obj.on("fail", (key: string, tag: string) => {
      this.failed.push(key);
      fail(key, tag);
    });
  }

  runAllAssertions() {
    this.beforeAll();
    this.obj.assertions.forEach((key) => {
      this.beforeEach();
      this.obj[key]();
      this.afterEach();
    });
    this.afterAll();
  }

  info(): suit {
    return {
      passed: this.passed.length,
      failed: this.failed.length,
      name: this.suitName,
    };
  }
}
