import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./" });

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testMatch: ["<rootDir>/test/**/*.spec.{ts,tsx}"],
  collectCoverageFrom: [
    "src/core/**/*.ts",
    "src/infra/**/*.ts",
    "!src/**/*.d.ts",
    "!src/core/domain/**/*.entity.ts",
    "!src/core/domain/**/*.repository.ts",
    "!src/core/domain/**/password-hasher.ts",
  ],
};

export default createJestConfig(config);
