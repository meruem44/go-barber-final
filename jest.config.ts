const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { compilerOptions } = require("./tsconfig.json");

export default {
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/modules/**/services/*.ts"],
  coverageDirectory: "coverage",
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/src/",
  }),
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.spec.ts"],
};
