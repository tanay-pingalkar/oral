export {};
declare global {
  namespace NodeJS {
    interface Global {
      Config: config;
      tests: Array<suit>;
      toRun: Set<string>;
      utility: Set<string>;
      before: string;
      after: string;
    }
  }
}

export declare interface suit {
  name: string;
  passed: number;
  failed: number;
}

declare interface config {
  testFiles: Array<string>;
  silent: boolean;
  watch: boolean;
  coverageDir: string;
  testDir: string;
  watchDir: string;
  clear: Boolean;
  noclear: Boolean;
  beforeEveryone: Function;
  afterEveryone: Function;
  nonotify: Boolean;
}

export declare interface testInfo {
  passed: number;
  failed: number;
  suits: number;
  tests: number;
}
