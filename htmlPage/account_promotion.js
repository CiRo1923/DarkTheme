module.exports = {
  HtmlWebpackPlugin: [{
    filename: 'myPromotion.html',
    template: '_shared/layout.ejs',
    action: 'myPromotion',
    description: '',
    chunks: ['account/promotion']
  }, {
    filename: 'mobile/myPromotion.html',
    template: '_shared/layout.ejs',
    action: 'account',
    blank: true,
    description: '',
    chunks: ['account/promotion_m']
  }]
};
