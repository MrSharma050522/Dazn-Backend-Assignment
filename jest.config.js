module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    // Option 1: Use testMatch to specify where your tests are located
    testMatch: ['**/src/tests/**/movie.test.ts'], // Match all `.test.ts` files inside `src/tests`
  
    // Option 2: Alternatively, use the roots property
    // roots: ['<rootDir>/src/tests'], // This tells Jest to look inside `src/tests` for test files
  };
  