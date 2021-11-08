module.exports = {
  HtmlWebpackPlugin: [{
    filename: 'singIn.html',
    template: '_shared/layout.ejs',
    action: 'singIn',
    description: '',
    chunks: ['singIn/index']
  }
  // , {
  //   filename: 'mobile/singIn.html',
  //   template: '_shared/layout.ejs',
  //   action: 'singIn',
  //   description: '',
  //   chunks: ['singIn/index_m']
  // }
  ]
};
