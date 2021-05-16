import fs from "fs";
import path from "path";
export const testFiles = (startPath): Set<string> => {
  const filter = ".test.ts";
  const testFilesSet: Set<string> = new Set([]);
  if (!fs.existsSync(startPath)) {
    throw new Error(`no dir :- ${startPath}`);
    return;
  }
  const files = fs.readdirSync(startPath);
  for (let i = 0; i < files.length; i++) {
    let filename = path.join(startPath, files[i]);
    let stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      testFiles(filename); //recurse
    } else if (filename.indexOf(filter) >= 0) {
      testFilesSet.add(filename);
    }
  }
  return testFilesSet;
};
