const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  devServer: {
    inline: true,
    contentBase: './'
  },
  // devtool: 'source-map',
  devtool: 'inline-source-map'
});
