module.exports = {
  testEnvironment: "node",
  setupFiles: [
    '<rootDir>/config/jest.setup.js'
  ],
  displayName: 'PLUMEJS',
  preset: 'ts-jest',
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: [
    "**/src/**/*.ts"
  ],
  testRegex: '(/__tests__/.*(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  globals: {
    'ts-jest': {
      diagnostics: false,
      tsConfig: '<rootDir>/tsconfig.json'
    }
  }
  //testNamePattern: "component"
};
