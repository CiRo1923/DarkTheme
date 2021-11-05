import 'css/sports/index.css';

import { tns } from 'tiny-slider/src/tiny-slider.js';
import { tinySlider } from '_common.js';
import { prjs } from '_factory.js';

prjs.$w.on('load', () => {
  tinySlider(tns);
});
