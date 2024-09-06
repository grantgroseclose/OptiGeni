module.exports = {
    preset: 'jest-expo',
    transform: {
        '^.+\\.(js|ts|tsx)$': 'babel-jest',
    },
    transformIgnorePatterns: [
        "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg)",
    ],
    setupFiles: [
        "./tests/mocks/async-storage.ts"
    ],
    setupFilesAfterEnv: [
        "./tests/mocks/server.ts"
    ]
};