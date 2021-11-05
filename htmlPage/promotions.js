module.exports = {
  HtmlWebpackPlugin: [{
    filename: 'promotions.html',
    template: '_shared/layout.ejs',
    action: 'promotions',
    description: '',
    chunks: ['promotions/index']
  }
  // , {
  //   filename: 'mobile/promotions.html',
  //   template: '_shared/layout.ejs',
  //   action: 'promotions',
  //   description: '',
  //   chunks: ['promotions/index_m']
  // }
  ]
};
