import LazyLoad from 'vanilla-lazyload';
import { prjs, svgRequire } from '_factory.js';

let lazyLoadFun = () => {
  return new LazyLoad({
    elements_selector: '.lazy',
    use_native: true
  });
};

/* 一次載入使用到的 svg */
svgRequire(require.context('../_svg/', true, /\.svg$/));

prjs.$d.on('ready', () => {
  lazyLoadFun();
});
