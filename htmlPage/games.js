module.exports = {
  HtmlWebpackPlugin: [{
    filename: 'games.html',
    template: '_shared/layout.ejs',
    action: 'games',
    description: '',
    chunks: ['games/index']
  }
  // , {
  //   filename: 'mobile/games.html',
  //   template: '_shared/layout.ejs',
  //   action: 'games',
  //   description: '',
  //   chunks: ['games/index_m']
  // }
  ]
};
