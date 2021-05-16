import arg from "arg";

export {};
declare global {
  namespace NodeJS {
    interface Global {
      Config: config;
    }
  }
}

export declare interface suit {
  name: string;
  passed: number;
  failed: number;
}

export declare interface config {
  silent: boolean;
  watch: boolean;
  testDir: string;
  watchDir: string;
  clear: Boolean;
  noclear: Boolean;
  beforeEveryone: Function;
  afterEveryone: Function;
  notify: Boolean;
  tsconfig: string;
}

export declare interface testInfo {
  passed: number;
  failed: number;
  suits: number;
  tests: number;
}

export type argsReturn = arg.Result<{
  "--tsconfig": StringConstructor;
  "--help": BooleanConstructor;
  "--version": BooleanConstructor;
  "--testDir": StringConstructor;
  "--coverageDir": StringConstructor;
  "--watch": BooleanConstructor;
  "--silent": BooleanConstructor;
  "--coverage": BooleanConstructor;
  "--watchDir": StringConstructor;
  "--clear": BooleanConstructor;
  "--noclear": BooleanConstructor;
  "--nonotify": BooleanConstructor;
}>;
