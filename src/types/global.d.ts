export {};
declare global {
  namespace NodeJS {
    interface Global {
      Config: config;
      tests: Array<suit>;
      toRun: Set<string>;
      utility: Set<string>;
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
}

export declare interface testInfo {
  passed: number;
  failed: number;
  suits: number;
  tests: number;
}
