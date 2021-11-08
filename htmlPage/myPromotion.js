module.exports = {
  HtmlWebpackPlugin: [{
    filename: 'myPromotion.html',
    template: '_shared/layout.ejs',
    action: 'myPromotion',
    description: '',
    chunks: ['myPromotion/index']
  }
  // , {
  //   filename: 'mobile/myPromotion.html',
  //   template: '_shared/layout.ejs',
  //   action: 'myPromotion',
  //   description: '',
  //   chunks: ['myPromotion/index_m']
  // }
  ]
};
