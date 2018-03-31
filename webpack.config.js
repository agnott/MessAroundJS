const path = require('path');

module.exports = (env) => ({
  entry: path.join(__dirname, 'src/main.js'),
  output: {
    path: path.join(__dirname, env === 'development' ? 'examples' : 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['env'],
          plugins: ['transform-react-jsx', 'transform-object-rest-spread'],
        }
      }
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'examples'),
    watchContentBase: true,
    port: 8000,
  },
});
