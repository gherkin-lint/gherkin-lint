module.exports = function (api) {
  api.cache(true);

  const presets = [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 4
        },
        useBuiltIns: 'entry',
        corejs: { version: 3 }
      }
    ]
  ];
  const plugins = [];

  return {
    presets,
    plugins
  };
}

