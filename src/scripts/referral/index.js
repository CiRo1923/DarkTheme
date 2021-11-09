import 'css/referral/index.css';

import '_common.js';
import { CopyToClipboard, prjs, j$ } from '_factory.js';

prjs.$d.on('click', '.jCopy', (e) => {
  const $this = j$(e.$this);
  CopyToClipboard($this.data('link'));
});
