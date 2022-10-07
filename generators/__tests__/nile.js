"use strict";
const path = require("path");
const helpers = require("yeoman-test");
const fs = require("fs");

const assertMinimalFiles = (runResult) => {
  runResult.assertFile(".gitignore");
  runResult.assertFile("pytest.ini");
  runResult.assertFile("README.md");
  runResult.assertFile("requirements.txt");
  runResult.assertFile("tests/utils.py");
};

describe("Testing generate a minimal Nile project", () => {
  let runResult;
  beforeAll(async () => {
    runResult = await helpers
      .run(path.join(__dirname, "../app"))
      .inTmpDir(function (dir) {
        const done = this.async();
        fs.rename(path.join(__dirname, "test"), dir, done);
      })
      .withPrompts({
        wantERC20: false,
        wantCI: false,
      });
  });

  it("Should have the minimum required files", () => {
    assertMinimalFiles(runResult);
  });
});
