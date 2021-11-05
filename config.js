const index = require('./htmlPage/index.js');
const sports = require('./htmlPage/sports.js');
const liveCasion = require('./htmlPage/liveCasion.js');
const promotions = require('./htmlPage/promotions.js');
const virtualSports = require('./htmlPage/virtualSports.js');
const games = require('./htmlPage/games.js');

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
      index.HtmlWebpackPlugin,
      sports.HtmlWebpackPlugin,
      liveCasion.HtmlWebpackPlugin,
      promotions.HtmlWebpackPlugin,
      virtualSports.HtmlWebpackPlugin,
      games.HtmlWebpackPlugin
    );

    if (process.env.NODE_ENV === 'production') {
      publish = def.concat(
        index.HtmlWebpackPlugin,
        sports.HtmlWebpackPlugin,
        liveCasion.HtmlWebpackPlugin,
        promotions.HtmlWebpackPlugin,
        virtualSports.HtmlWebpackPlugin,
        games.HtmlWebpackPlugin
      );
    }

    return publish;
  }
};
