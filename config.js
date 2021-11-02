const index = require('./htmlPage/index.js');

module.exports = {
  ieVersion: 10, // 10 或 0
  tailwindcss: true,
  desktopMinWidth: 1440,
  mobileMaxWidth: 740,
  basicMobileWidth: 360,
  copyStatic: true,
  docker: false,
  https: true,
  rootDirectory: 'auto',
  component: '_components/',
  container: '_container/',
  js: 'scripts/',
  css: 'assets/css/',
  imgs: 'assets/img/',
  svgs: '_svg/',
  fonts: 'static/fonts/',
  plugins: () => {
    const def = [];
    let publish = def.concat(
      index.HtmlWebpackPlugin
    );

    if (process.env.NODE_ENV === 'production') {
      publish = def.concat(
        index.HtmlWebpackPlugin
      );
    }

    return publish;
  }
};
