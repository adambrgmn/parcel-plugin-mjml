import ParcelBundler = require('parcel-bundler');

export = function parcelMjml(bundler: ParcelBundler) {
  bundler.addAssetType('mjml', require.resolve('./MJMLAsset'));
};
