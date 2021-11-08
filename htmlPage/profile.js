module.exports = {
  HtmlWebpackPlugin: [{
    filename: 'profile.html',
    template: '_shared/layout.ejs',
    action: 'profile',
    description: '',
    chunks: ['profile/index']
  }
  // , {
  //   filename: 'mobile/profile.html',
  //   template: '_shared/layout.ejs',
  //   action: 'profile',
  //   description: '',
  //   chunks: ['profile/index_m']
  // }
  ]
};
