module.exports = {
  HtmlWebpackPlugin: [{
    filename: 'changePassword.html',
    template: '_shared/layout.ejs',
    action: 'changePassword',
    description: '',
    chunks: ['account/changePassword']
  }, {
    filename: 'singIn.html',
    template: '_shared/layout.ejs',
    action: 'singIn',
    description: '',
    chunks: ['account/singIn']
  }, {
    filename: 'register.html',
    template: '_shared/layout.ejs',
    action: 'register',
    description: '',
    chunks: ['account/register']
  }, {
    filename: 'mobile/changePassword.html',
    template: '_shared/layout.ejs',
    action: 'account',
    description: '',
    blank: true,
    chunks: ['account/changePassword_m']
  }, {
    filename: 'mobile/singIn.html',
    template: '_shared/layout.ejs',
    action: 'account',
    blank: true,
    description: '',
    chunks: ['account/singIn_m']
  }, {
    filename: 'mobile/register.html',
    template: '_shared/layout.ejs',
    action: 'account',
    blank: true,
    description: '',
    chunks: ['account/register_m']
  }]
};
