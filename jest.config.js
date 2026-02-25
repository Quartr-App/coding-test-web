const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/app/$1",
    "^@assets/(.*)$": "<rootDir>/app/assets/$1",
    "^@components/(.*)$": "<rootDir>/app/components/$1",
    "^@hooks/(.*)$": "<rootDir>/app/hooks/$1",
    "^@types/(.*)$": "<rootDir>/app/types/$1",
  },
};

module.exports = createJestConfig(customJestConfig);
