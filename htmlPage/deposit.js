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
  }, {
    filename: 'mobile/transaction.html',
    template: '_shared/layout.ejs',
    action: 'transaction',
    blank: true,
    description: '',
    chunks: ['deposit/transaction_m']
  }, {
    filename: 'mobile/deposit.html',
    template: '_shared/layout.ejs',
    action: 'deposit',
    blank: true,
    description: '',
    chunks: ['deposit/deposit_m']
  }, {
    filename: 'mobile/withdrawal.html',
    template: '_shared/layout.ejs',
    action: 'withdrawal',
    blank: true,
    description: '',
    chunks: ['deposit/withdrawal_m']
  }, {
    filename: 'mobile/history.html',
    template: '_shared/layout.ejs',
    action: 'history',
    blank: true,
    description: '',
    chunks: ['deposit/history_m']
  }
  ]
};
