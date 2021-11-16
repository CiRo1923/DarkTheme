module.exports = {
  HtmlWebpackPlugin: [{
    filename: 'referral.html',
    template: '_shared/layout.ejs',
    blank: true,
    action: 'referral',
    description: '',
    chunks: ['account/referral']
  }, {
    filename: 'mobile/referral.html',
    template: '_shared/layout.ejs',
    blank: true,
    action: 'account',
    description: '',
    chunks: ['account/referral_m']
  }]
};
