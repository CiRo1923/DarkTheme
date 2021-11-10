import 'css/referral/index.css';

import { swich } from '_common.js';
import {
  prjs, j$, CopyToClipboard, documentOff
} from '_factory.js';

prjs.$d.on('click', '.jCopy', (e) => {
  const $this = j$(e.$this);
  CopyToClipboard($this.data('link'));
}).on('click', '.jRulesCtrl', () => {
  const rulesClass = {
    main: '.jRules',
    bd: '.jRulesBd'
  };

  j$(rulesClass.main).addClass('--show');

  documentOff(rulesClass.bd, () => {
    j$(rulesClass.main).removeClass('--show');
  });
});

prjs.$d.on('ready', () => {
  swich();
});
