module.exports = {
  HtmlWebpackPlugin: [{
    filename: 'mobile/contact.html',
    template: '_shared/layout.ejs',
    action: 'contact',
    blank: true,
    description: '',
    chunks: ['contact/index_m']
  }]
};
