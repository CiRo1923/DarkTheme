module.exports = {
  HtmlWebpackPlugin: [{
    filename: 'changePassword.html',
    template: '_shared/layout.ejs',
    action: 'changePassword',
    description: '',
    chunks: ['changePassword/index']
  }
  // , {
  //   filename: 'mobile/changePassword.html',
  //   template: '_shared/layout.ejs',
  //   action: 'changePassword',
  //   description: '',
  //   chunks: ['changePassword/index_m']
  // }
  ]
};
