import 'css/deposit/history_m.css';

import { swich } from '_common.js';
import { prjs } from '_factory.js';

prjs.$w.on('load', () => {
  swich();
});
