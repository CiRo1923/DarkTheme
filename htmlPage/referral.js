module.exports = {
  HtmlWebpackPlugin: [{
    filename: 'referral.html',
    template: '_shared/layout.ejs',
    blank: true,
    action: 'referral',
    description: '',
    chunks: ['referral/index']
  }
  // , {
  //   filename: 'mobile/referral.html',
  //   template: '_shared/layout.ejs',
  //   blank: true,
  //   action: 'referral',
  //   description: '',
  //   chunks: ['referral/index_m']
  // }
  ]
};
