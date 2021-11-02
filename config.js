const index = require('./htmlPage/index.js');

module.exports = {
  ieVersion: 10, // 10 或 0
  tailwindcss: true,
  desktopMinWidth: 1440,
  mobileMaxWidth: 740,
  basicMobileWidth: 360,
  copyStatic: false,
  docker: false,
  https: true,
  rootDirectory: 'auto',
  component: '_components/',
  container: '_container/',
  js: 'scripts/',
  css: 'assets/css/',
  imgs: 'assets/img/',
  svgs: '_svg/',
  fonts: 'static',
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
