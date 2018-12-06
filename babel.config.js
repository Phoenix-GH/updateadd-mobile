module.exports = {
  presets: [
    'react-native',
    '@babel/preset-flow',
    'module:metro-react-native-babel-preset',
  ],
  plugins: [
    '@babel/transform-flow-strip-types',
    '@babel/plugin-proposal-class-properties',
    '@babel/transform-runtime',
  ],
}
