
const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/index.html', to: 'index.html' },
        { from: 'src/index.css', to: 'index.css' },
        { from: 'src/images', to: 'images' }
      ],
    })
  ],
  mode: "production",
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env"
            ]
          }
        }
      }
    ]
  }
};