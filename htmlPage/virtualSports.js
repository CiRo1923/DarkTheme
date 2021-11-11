module.exports = {
  HtmlWebpackPlugin: [{
    filename: 'virtualSports.html',
    template: '_shared/layout.ejs',
    action: 'virtualSports',
    description: '',
    chunks: ['virtualSports/index']
  }, {
    filename: 'mobile/virtualSports.html',
    template: '_shared/layout.ejs',
    action: 'virtualSports',
    description: '',
    chunks: ['virtualSports/index_m']
  }]
};
