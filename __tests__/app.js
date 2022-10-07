"use strict";
const path = require("path");
const helpers = require("yeoman-test");
const fs = require("fs");
const { HARDHAT } = require("../generators/app/constants");

const assertMinimalFiles = (runResult) => {
  runResult.assertFile(".gitignore");
  runResult.assertFile("hardhat.config.js");
  runResult.assertFile("package.json");
  runResult.assertFile("README.md");
};

const assertERC20Files = (runResult) => {
  runResult.assertFile("scripts/ERC20.js");
  runResult.assertFile("src/ERC20.cairo");
  runResult.assertFile("tests/ERC20.js");
};

const assertERC721Files = (runResult) => {
  runResult.assertFile("scripts/ERC721.js");
  runResult.assertFile("src/ERC721.cairo");
  runResult.assertFile("tests/ERC721.js");
};

describe("Testing generate a minimal Hardhat project", () => {
  let runResult;
  beforeAll(async () => {
    runResult = await helpers
      .run(path.join(__dirname, "../generators/app"))
      .inTmpDir(function (dir) {
        const done = this.async();
        fs.rename(path.join(__dirname, "test"), dir, done);
      })
      .withPrompts({
        framework: HARDHAT,
        wantERC20: false,
        wantERC721: false,
      });
  });

  it("Should have the minimum required files", () => {
    assertMinimalFiles(runResult);
  });
});

describe("Testing generate a Hardhat project with ERC20 token", () => {
  let runResult;
  beforeAll(async () => {
    runResult = await helpers
      .run(path.join(__dirname, "../generators/app"))
      .inTmpDir(function (dir) {
        const done = this.async();
        fs.rename(path.join(__dirname, "test"), dir, done);
      })
      .withPrompts({
        framework: HARDHAT,
        wantERC20: true,
      });
  });

  it("Should have the required files", () => {
    assertMinimalFiles(runResult);
    assertERC20Files(runResult);
  });
});

describe("Testing generate a Hardhat project with ERC20 and ERC721 tokens", () => {
  let runResult;
  beforeAll(async () => {
    runResult = await helpers
      .run(path.join(__dirname, "../generators/app"))
      .inTmpDir(function (dir) {
        const done = this.async();
        fs.rename(path.join(__dirname, "test"), dir, done);
      })
      .withPrompts({
        framework: HARDHAT,
        wantERC20: true,
        wantERC721: true,
      });
  });

  it("Should have the required files", () => {
    assertMinimalFiles(runResult);
    assertERC20Files(runResult);
    assertERC721Files(runResult);
  });
});
