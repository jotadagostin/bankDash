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
    "src/components/auth/**/*.tsx",
    "src/components/transactions/TransactionsTable.tsx",
    "!src/**/*.d.ts",
    "!src/components/auth/AuthIllustration.tsx",
    "!src/core/domain/**/*.entity.ts",
    "!src/core/domain/**/*.repository.ts",
    "!src/core/domain/**/password-hasher.ts",
  ],
};

const jestConfig = async () => {
  const nextConfig = await createJestConfig(config)();

  return {
    ...nextConfig,
    // nuqs publica arquivos ESM. Com pnpm o caminho fica em
    // node_modules/.pnpm/nuqs@.../node_modules/nuqs, por isso o ".*".
    transformIgnorePatterns: [
      "/node_modules/(?!.*nuqs)",
      "^.+\\.module\\.(css|sass|scss)$",
    ],
  };
};

export default jestConfig;
