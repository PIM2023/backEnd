module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testMatch: ["**/tests/**/*.test.[jt]s?(x)"],
  setupFilesAfterEnv: ["<rootDir>/tests/setupTests.ts"],
  coverageDirectory: "coverage",
  collectCoverageFrom: ["src/**/*.ts"],
  transform: {
    "^.+\\.(t|j)sx?$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.json",
      },
    ],
  },
};
