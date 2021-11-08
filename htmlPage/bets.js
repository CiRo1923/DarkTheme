module.exports = {
  HtmlWebpackPlugin: [{
    filename: 'betsRunning.html',
    template: '_shared/layout.ejs',
    action: 'bets',
    description: '',
    chunks: ['bets/index']
  }, {
    filename: 'betsSettled.html',
    template: '_shared/layout.ejs',
    action: 'bets',
    description: '',
    chunks: ['bets/index']
  }
  // , {
  //   filename: 'mobile/betsRunning.html',
  //   template: '_shared/layout.ejs',
  //   action: 'bets',
  //   description: '',
  //   chunks: ['bets/index_m']
  // }, {
  //   filename: 'mobile/betsSettled.html',
  //   template: '_shared/layout.ejs',
  //   action: 'bets',
  //   description: '',
  //   chunks: ['bets/index_m']
  // }
  ]
};
