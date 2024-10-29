module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-paper/babel',
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./'], // This tells Babel to use the root directory
        alias: {
          'moti/skeleton': 'moti/skeleton/react-native-linear-gradient',
          contexts: './contexts',
          components: './components',
          hooks: './hooks',
        },
      },
    ],
  ],
};
