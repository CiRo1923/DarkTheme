module.exports = {
  HtmlWebpackPlugin: [{
    filename: 'index.html',
    template: '_shared/layout.ejs',
    action: 'home',
    description: '',
    chunks: ['home/index']
  }, {
    filename: 'mobile/index.html',
    template: '_shared/layout.ejs',
    action: 'home',
    description: '',
    chunks: ['home/index_m']
  }]
};
