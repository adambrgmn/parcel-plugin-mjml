function parcelMjml(bundler) {
  bundler.addAssetType('mjml', require.resolve('./MJMLAsset'));
  return bundler;
}

module.exports = parcelMjml;
