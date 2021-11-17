module.exports = {
  HtmlWebpackPlugin: [{
    filename: 'promotions.html',
    template: '_shared/layout.ejs',
    action: 'promotions',
    description: '',
    chunks: ['promotions/index']
  }, {
    filename: 'promotionsDetail.html',
    template: '_shared/layout.ejs',
    action: 'promotions',
    box: true,
    description: '',
    chunks: ['promotions/index'],
    excludeAssets: [/.*/]
  }, {
    filename: 'mobile/promotions.html',
    template: '_shared/layout.ejs',
    action: 'promotions',
    description: '',
    chunks: ['promotions/index_m']
  }, {
    filename: 'mobile/promotionsDetail.html',
    template: '_shared/layout.ejs',
    action: 'promotions',
    box: true,
    description: '',
    chunks: ['promotions/index_m'],
    excludeAssets: [/.*/]
  }]
};
