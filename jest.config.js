module.exports = {
  roots: ["<rootDir>/"],
  testMatch: ["**/*.test.js"],
  transform: {
    "^.+\\.jsx?$": `<rootDir>/jest-preprocess.js`,
  },
};
