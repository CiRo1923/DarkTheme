module.exports = {
  HtmlWebpackPlugin: [{
    filename: 'register.html',
    template: '_shared/layout.ejs',
    action: 'register',
    description: '',
    chunks: ['register/index']
  }
  // , {
  //   filename: 'mobile/register.html',
  //   template: '_shared/layout.ejs',
  //   action: 'register',
  //   description: '',
  //   chunks: ['register/index_m']
  // }
  ]
};
