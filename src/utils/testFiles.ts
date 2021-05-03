import fs from "fs";
import path from "path";
export const testFiles = (
  startPath = process.cwd() + global.Config.testDir
) => {
  const filter = ".test.ts";
  if (!fs.existsSync(startPath)) {
    console.log("no dir ", startPath);
    return;
  }
  const files = fs.readdirSync(startPath);
  for (let i = 0; i < files.length; i++) {
    let filename = path.join(startPath, files[i]);
    let stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      testFiles(filename); //recurse
    } else if (filename.indexOf(filter) >= 0) {
      global.Config.testFiles.push(filename);
    }
  }
};
