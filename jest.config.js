module.exports = {
  roots: ["<rootDir>/test/"],
  testMatch: ["**/?(*.)+(spec|test).+(ts|tsx|js)"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testTimeout: 60000,
  preset: "@shelf/jest-mongodb",
};
