module.exports = {
    rootDir: '../',
    moduleFileExtensions: ['json', 'ts', 'tsx', 'js', 'jsx'],
    moduleNameMapper: {
        '^src(.*)$': '<rootDir>/src$1',
        '^test(.*)$': '<rootDir>/test$1',
        '^views(.*)$': '<rootDir>/src/views$1',
        '^hooks(.*)$': '<rootDir>/src/hooks$1',
        '^services(.*)$': '<rootDir>/src/services$1',
        '^utils(.*)$': '<rootDir>/src/utils$1',
        '^infra(.*)$': '<rootDir>/src/infra$1',
        '^pages(.*)$': '<rootDir>/src/pages$1',
        '\\.(css|sass|scss)$': '<rootDir>/test/__mocks__/styles.js'
    },
    transform: {
        '\\.tsx?$': 'ts-jest'
    },
    testRegex: '.spec.(tsx?|ts?)$',
    testPathIgnorePatterns: ['../node_modules/'],
    collectCoverage: true,
    coverageReporters: ['json', 'html']
}
