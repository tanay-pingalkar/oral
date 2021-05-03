import { testInfo as testInfoType } from "../types/global";
export function testsInfo(): testInfoType {
  let suits = global.tests.length;
  let tests = 0;
  let passed = 0;
  let failed = 0;
  global.tests.forEach((value) => {
    tests = tests + value.failed + value.passed;
    (passed = passed + value.passed), (failed = failed + value.failed);
  });
  return {
    suits: suits,
    tests: tests,
    passed: passed,
    failed: failed,
  };
}
