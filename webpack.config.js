const path = require('path')

module.exports = {
  entry: './scripts/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  // module: {
  //   rules: [{
  //     test: /\.jsx?$/,
  //     exclude: /node_modules/,
  //     use: {
  //       loader: 'babel-loader',
  //       options: {
  //         presets: ['@babel/preset-react']
  //       }
  //     }
  //   }]
  // }
}
