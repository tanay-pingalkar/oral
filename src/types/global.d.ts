import { Equal, Match, True } from "../main";

export {};
declare global {
  namespace NodeJS {
    interface Global {
      Config: config;
    }
  }
}

declare interface config {
  testFiles: Array<string>;
  silent: boolean;
  watch: boolean;
  coverageDir: string;
  testDir: string;
  watchDir: string;
}
