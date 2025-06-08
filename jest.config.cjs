module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation)',
  ],
  transform: {
    '^.+\\.[jt]sx?$': ['babel-jest', {configFile: './babel.config.cjs'}],
  },
};
