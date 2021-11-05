module.exports = {
  HtmlWebpackPlugin: [{
    filename: 'liveCasion.html',
    template: '_shared/layout.ejs',
    action: 'liveCasion',
    description: '',
    chunks: ['liveCasion/index']
  }
  // , {
  //   filename: 'mobile/liveCasion.html',
  //   template: '_shared/layout.ejs',
  //   action: 'liveCasion',
  //   description: '',
  //   chunks: ['liveCasion/index_m']
  // }
  ]
};
