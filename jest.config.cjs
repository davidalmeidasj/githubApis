module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ["**/test/**/*.test.ts"],
    moduleNameMapper: {
        'node-fetch': 'node-fetch/src/index.js'
    }
};
