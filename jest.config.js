module.exports = {
  preset: "ts-jest",
  collectCoverage: true,
  coverageReporters: ["lcov"],
  reporters: [
    "default",
    [
      "jest-sonar-reporter",
      {
        reportFile: "test-report.xml",
        indent: 4,
      },
    ],
  ],
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
