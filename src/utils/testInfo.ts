import { suit, testInfo as testInfoType } from "../global";
export function testsInfo(result: Array<suit>): testInfoType {
  let suits = result.length;
  let tests = 0;
  let passed = 0;
  let failed = 0;
  result.forEach((value) => {
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
