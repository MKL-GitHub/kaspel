const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');
const src = path.resolve(__dirname, 'src') + '/';

module.exports = override(
  addWebpackAlias({
    '@components': src + 'components',
    '@containers': src + 'containers',
    '@store': src + 'store',

    '@components/*': src + 'components/*',
    '@containers/*': src + 'containers/*',
    '@store/*': src + 'store/*',
  })
);