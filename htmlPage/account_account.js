module.exports = {
  HtmlWebpackPlugin: [{
    filename: 'mobile/account.html',
    template: '_shared/layout.ejs',
    action: 'account',
    blank: true,
    description: '',
    chunks: ['account/account_m']
  }]
};
