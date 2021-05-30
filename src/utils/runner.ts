import chalk from "chalk";
import EventEmitter from "events";
import { suit } from "../global";
import { centerString } from "./centerString";
import { pass, fail } from "./prints";

export class Runner extends EventEmitter {
  assertions: Set<string> = new Set([]);
  suitName: string;
  beforeAll: string;
  afterAll: string;
  beforeEach: string;
  afterEach: string;
  passed: Array<string> = [];
  failed: Array<string> = [];
  obj: any;
  construct: any;
  globalObj: any;

  constructor(object: any, globalObject?: any) {
    super();
    this.globalObj = globalObject;
    this.construct = object;
    this.configure();
  }

  configure(): void {
    const obj = new this.construct(this.globalObj);
    this.suitName = obj.suiteName;
    this.obj = obj;
    this.assertions = obj.assertions;

    console.log(
      chalk.bold.bgMagentaBright.black(centerString(this.suitName, 50))
    );

    if (obj.beforeAll) this.beforeAll = obj.beforeAll;
    if (obj.afterAll) this.afterAll = obj.afterAll;
    if (obj.beforeEach) this.beforeEach = obj.beforeEach;
    if (obj.afterEach) this.afterAll = obj.afterEach;
  }

  async runAllAssertions() {
    this.obj.on("pass", (key: string, tag: string) => {
      this.passed.push(key);
      pass(key, tag);
    });
    this.obj.on("fail", (key: string, tag: string) => {
      this.failed.push(key);
      fail(key, tag);
    });
    if (this.beforeAll) await this.obj[this.beforeAll]();
    for (const key of this.obj.assertions) {
      if (this.beforeEach) await this.obj[this.beforeEach]();
      await this.obj[key]();
      if (this.afterEach) await this.obj[this.afterEach]();
    }
    if (this.afterAll) await this.obj[this.afterAll]();
  }

  info(): suit {
    return {
      passed: this.passed.length,
      failed: this.failed.length,
      name: this.suitName,
    };
  }
}
