import 'css/deposit/history.css';

import { swich } from '_common.js';
import { prjs } from '_factory.js';

prjs.$d.on('ready', () => {
  swich();
});
