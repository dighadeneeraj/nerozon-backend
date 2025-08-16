module.exports = {
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/tests/setup/mongoMemory.js"],
  testMatch: ["**/tests/**/*.test.js"], // all test files
  verbose: true,
  forceExit: true, // exit after tests finish
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true
};
