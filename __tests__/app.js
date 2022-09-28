"use strict";
const path = require("path");
const helpers = require("yeoman-test");
const fs = require("fs");
const { HARDHAT } = require("../generators/app/constants");

describe("Testing generate Hardhat project", () => {
  let runResult;
  beforeAll(async () => {
    runResult = await helpers
      .run(path.join(__dirname, "../generators/app"))
      .withPrompts({})
      .inTmpDir(function (dir) {
        const done = this.async();
        fs.rename(path.join(__dirname, "test"), dir, done);
      })
      .withPrompts({
        framework: HARDHAT,
        wantERC20: false,
        wantCI: false,
        wantERC721: false,
      });
  });

  it("Should have the minimum required files", () => {
    runResult.assertFile(".gitignore");
    runResult.assertFile("hardhat.config.js");
    runResult.assertFile("package.json");
    runResult.assertFile("README.md");
  });
});
