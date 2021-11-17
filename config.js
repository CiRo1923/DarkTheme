const index = require('./htmlPage/index.js');
const sports = require('./htmlPage/sports.js');
const liveCasion = require('./htmlPage/liveCasion.js');
const promotions = require('./htmlPage/promotions.js');
const virtualSports = require('./htmlPage/virtualSports.js');
const games = require('./htmlPage/games.js');
const accountAccount = require('./htmlPage/account_account.js');
const accountBalance = require('./htmlPage/account_balance.js');
const accountBets = require('./htmlPage/account_bets.js');
const accountForm = require('./htmlPage/account_form.js');
const accountPeofile = require('./htmlPage/account_peofile.js');
const accountPromotion = require('./htmlPage/account_promotion.js');
const accountReferral = require('./htmlPage/account_referral.js');
const deposit = require('./htmlPage/deposit.js');
const statement = require('./htmlPage/statement.js');
const contact = require('./htmlPage/contact.js');

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
      // sports.HtmlWebpackPlugin,
      // liveCasion.HtmlWebpackPlugin,
      // promotions.HtmlWebpackPlugin,
      // virtualSports.HtmlWebpackPlugin,
      // games.HtmlWebpackPlugin,
      accountAccount.HtmlWebpackPlugin,
      // accountBalance.HtmlWebpackPlugin,
      // accountBets.HtmlWebpackPlugin,
      // accountForm.HtmlWebpackPlugin,
      // accountPeofile.HtmlWebpackPlugin,
      // accountPromotion.HtmlWebpackPlugin,
      accountReferral.HtmlWebpackPlugin
      // deposit.HtmlWebpackPlugin,
      // statement.HtmlWebpackPlugin,
      // bets.HtmlWebpackPlugin,
      // contact.HtmlWebpackPluginaccount
    );

    if (process.env.NODE_ENV === 'production') {
      publish = def.concat(
        index.HtmlWebpackPlugin,
        sports.HtmlWebpackPlugin,
        liveCasion.HtmlWebpackPlugin,
        promotions.HtmlWebpackPlugin,
        virtualSports.HtmlWebpackPlugin,
        games.HtmlWebpackPlugin,
        accountAccount.HtmlWebpackPlugin,
        accountBalance.HtmlWebpackPlugin,
        accountBets.HtmlWebpackPlugin,
        accountForm.HtmlWebpackPlugin,
        accountPeofile.HtmlWebpackPlugin,
        accountPromotion.HtmlWebpackPlugin,
        accountReferral.HtmlWebpackPlugin,
        deposit.HtmlWebpackPlugin,
        statement.HtmlWebpackPlugin,
        contact.HtmlWebpackPlugin
      );
    }

    return publish;
  }
};
