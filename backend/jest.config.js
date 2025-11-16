module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["**/*.test.{ts,tsx}"],
    moduleNameMapper: {
        "@domain/(.*)": "<rootDir>/src/domain/$1",
        "@kanban-types/(.*)": "<rootDir>/src/types/$1",
        "@controllers/(.*)": "<rootDir>/src/controllers/$1",
        "@database/(.*)": "<rootDir>/src/database/$1",
        "@useCases/(.*)": "<rootDir>/src/useCases/$1",
        "@config/(.*)": "<rootDir>/src/config/$1",
        "@routes/(.*)": "<rootDir>/src/routes/$1",
    },
};
