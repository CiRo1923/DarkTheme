module.exports = {
  HtmlWebpackPlugin: [{
    filename: 'betsRunning.html',
    template: '_shared/layout.ejs',
    action: 'bets',
    description: '',
    chunks: ['account/bets']
  }, {
    filename: 'betsSettled.html',
    template: '_shared/layout.ejs',
    action: 'bets',
    description: '',
    chunks: ['account/bets']
  }, {
    filename: 'mobile/betsRunning.html',
    template: '_shared/layout.ejs',
    action: 'account',
    blank: true,
    description: '',
    chunks: ['account/bets_m']
  }, {
    filename: 'mobile/betsSettled.html',
    template: '_shared/layout.ejs',
    action: 'account',
    blank: true,
    description: '',
    chunks: ['account/bets_m']
  }]
};
