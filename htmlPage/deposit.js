module.exports = {
  HtmlWebpackPlugin: [{
    filename: 'deposit.html',
    template: '_shared/layout.ejs',
    action: 'deposit',
    description: '',
    chunks: ['deposit/deposit']
  }, {
    filename: 'withdrawal.html',
    template: '_shared/layout.ejs',
    action: 'withdrawal',
    description: '',
    chunks: ['deposit/withdrawal']
  }, {
    filename: 'history.html',
    template: '_shared/layout.ejs',
    action: 'history',
    description: '',
    chunks: ['deposit/history']
  }
  // , {
  //   filename: 'mobile/deposit.html',
  //   template: '_shared/layout.ejs',
  //   action: 'deposit',
  //   description: '',
  //   chunks: ['deposit/deposit_m']
  // }, {
  //   filename: 'mobile/withdrawal.html',
  //   template: '_shared/layout.ejs',
  //   action: 'withdrawal',
  //   description: '',
  //   chunks: ['deposit/withdrawal_m']
  // }, {
  //   filename: 'mobile/history.html',
  //   template: '_shared/layout.ejs',
  //   action: 'history',
  //   description: '',
  //   chunks: ['deposit/history_m']
  // }
  ]
};