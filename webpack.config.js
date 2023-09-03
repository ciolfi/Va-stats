module.exports = {
  entry: './index.js',
  resolve: {
      alias: {
          'react-native$': 'react-native-web'
      }
  },
  mode: 'production',
  module: {
    rules: [{ test: /\.svg$/, use: 'raw-loader' }],
    rules: [{ test: /\.css$/, use: 'raw-loader' }],
  },
  node: {
   fs: "empty"
  }
}
