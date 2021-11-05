module.exports = {
  HtmlWebpackPlugin: [{
    filename: 'sports.html',
    template: '_shared/layout.ejs',
    action: 'sports',
    description: '',
    chunks: ['sports/index']
  }
  // , {
  //   filename: 'mobile/sports.html',
  //   template: '_shared/layout.ejs',
  //   action: 'sports',
  //   description: '',
  //   chunks: ['sports/index_m']
  // }
  ]
};
