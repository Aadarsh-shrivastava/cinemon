module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'], // This tells Babel to use the root directory
        alias: {
          contexts: './contexts', // If your contexts folder is in the root
          components: './components', // Example for a components folder in the root
          // Add more aliases as needed
        },
      },
    ],
  ],
};
