module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'], // This tells Babel to use the root directory
        alias: {
          contexts: './contexts',
          components: './components',
          hooks: './hooks',
        },
      },
    ],
  ],
};
