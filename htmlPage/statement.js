module.exports = {
  HtmlWebpackPlugin: [{
    filename: 'statement.html',
    template: '_shared/layout.ejs',
    action: 'statement',
    description: '',
    chunks: ['statement/index']
  }
  // , {
  //   filename: 'mobile/statement.html',
  //   template: '_shared/layout.ejs',
  //   action: 'statement',
  //   description: '',
  //   chunks: ['statement/index_m']
  // }
  ]
};
