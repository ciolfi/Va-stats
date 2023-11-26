export const entry = './index.js';
export const resolve = {
  alias: {
    'react-native$': 'react-native-web'
  }
};
export const mode = 'production';
export const module = {
  rules: [
    { 
      test: /\.svg$/, use: 'raw-loader' 
    },
    {
      test: /\.css$/i,
      include: path.resolve(__dirname, 'src'),
      use: ['style-loader', 'css-loader', 'postcss-loader'],
    },
  ], 
};
export const node = {
  fs: "empty"
};
