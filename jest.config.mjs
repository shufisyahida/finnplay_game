import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

/** @type {import('jest').Config} */
const config = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/lib/auth$": "<rootDir>/src/lib/auth",
    "^@/lib/user$": "<rootDir>/src/lib/user",
  },
};

export default createJestConfig(config);
