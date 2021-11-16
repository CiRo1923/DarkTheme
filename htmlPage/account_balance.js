module.exports = {
  HtmlWebpackPlugin: [{
    filename: 'mobile/balance.html',
    template: '_shared/layout.ejs',
    action: 'account',
    blank: true,
    description: '',
    chunks: ['account/balance_m']
  }]
};
