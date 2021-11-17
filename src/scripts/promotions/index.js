import 'css/promotions/index.css';

import { tns } from 'tiny-slider/src/tiny-slider.js';
import { tinySlider, boxPopup } from '_common.js';
import { prjs } from '_factory.js';

boxPopup();

prjs.$w.on('load', () => {
  tinySlider(tns);
});
