module.exports = {
  HtmlWebpackPlugin: [{
    filename: 'text.html',
    template: '_shared/layout.ejs',
    action: 'text',
    description: '',
    chunks: ['text/index']
  }, {
    filename: 'mobile/text.html',
    template: '_shared/layout.ejs',
    action: 'text',
    blank: true,
    description: '',
    chunks: ['text/index_m']
  }]
};
