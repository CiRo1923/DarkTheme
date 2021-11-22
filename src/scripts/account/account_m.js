import 'css/account/account_m.css';

import '_common.js';
import { prjs, j$, documentOff } from '_factory.js';

const lang = () => {
  const langClass = {
    main: '.jLang',
    ctrl: '.jLangCtrl',
    bd: '.jLangBd',
    btn: '.jLangBtn',
    txt: '.jLangTxt',
    flag: '.jLangFlag'
  };

  j$(langClass.bd).css('max-height', `${j$(langClass.bd).height()}px`);

  j$(langClass.ctrl).on('click', (e) => {
    const $this = j$(e.$this);

    $this.toggleClass('active');

    documentOff(`${langClass.main} > *`, () => {
      j$(langClass.ctrl).removeClass('active');
    });
  });

  j$(langClass.btn).on('click', (e) => {
    const $this = j$(e.$this);
    const txt = $this.find(langClass.txt).text();
    const flag = $this.find(`${langClass.flag} > img`).attr('src');
    const $ctrlTxt = j$(langClass.ctrl).find(langClass.txt);
    const $ctrlFlag = j$(langClass.ctrl).find(`${langClass.flag} > img`);

    $ctrlTxt.text(txt);
    $ctrlFlag.attr('src', flag);
    j$(langClass.ctrl).removeClass('active');
  });
};

prjs.$w.on('load', () => {
  lang();
});
