module.exports = {
  presets: [
    'react-native',
    '@babel/preset-flow',
    'module:metro-react-native-babel-preset',
  ],
  plugins: [
    ['flow-react-proptypes', { ignoreNodeModules: true }],
    '@babel/plugin-transform-flow-strip-types',
    '@babel/plugin-proposal-json-strings',
    ['@babel/plugin-proposal-class-properties', { loose: false }],
    '@babel/transform-runtime',
    '@babel/plugin-syntax-optional-chaining',
    'babel-plugin-styled-components',
  ],
}
