const { composePlugins, withNx } = require('@nx/webpack');
const { merge } = require('webpack-merge')

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), (config) => {
  return merge(config, {
    module: {
      rules: [
        {
          test: /\.node$/,
          loader: "node-loader"
        }
      ]
    }
  })
});
