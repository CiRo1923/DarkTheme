module.exports = {
  HtmlWebpackPlugin: [{
    filename: 'profile.html',
    template: '_shared/layout.ejs',
    action: 'profile',
    description: '',
    chunks: ['account/profile']
  }, {
    filename: 'mobile/profile.html',
    template: '_shared/layout.ejs',
    action: 'account',
    blank: true,
    description: '',
    chunks: ['account/profile_m']
  }]
};
