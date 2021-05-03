export {};
declare global {
  namespace NodeJS {
    interface Global {
      Config: config;
      tests: Array<suit>;
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
}

export declare interface testInfo {
  passed: number;
  failed: number;
  suits: number;
  tests: number;
}
