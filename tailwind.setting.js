// 自定義 spacing、negative、borderRadius 的時候需開啟 setData
// const { setData } = require('./tailwind.function.js');

const fontFamily = 'roboto, "微軟正黑體", "Microsoft JhengHei", "Heiti TC", "黑體", sans-serif';

const lineHeight = 1.14;

const spacing = {};

const size = {
  '2full': '200%',
  650: '650px',
  480: '480px',
  240: '240px',
  226: '226px',
  208: '208px',
  200: '200px',
  188: '188px',
  185: '185px',
  170: '170px',
  168: '168px',
  160: '160px',
  140: '140px',
  120: '120px',
  110: '110px',
  105: '105px',
  100: '100px',
  54: '54px',
  40: '40px',
  32: '32px',
  16: '16px'
};

const negative = {};

const borderRadius = {};

const leading = {
  1.2: '1.2',
  32: '32px'
};

const zIndex = {
  '-1': -1,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5
};

const fontSize = {
  36: '36px',
  28: '28px',
  24: '24px',
  20: '20px',
  16: '16px',
  14: '14px',
  12: '12px'
};

const colors = {
  x001e: '#05071e',
  x0030: '#0b0e30',
  x1241: '#1f2141',
  x3368: '#393c68',
  x88a1: '#8486a1',
  x65cb: '#6b52cb',
  xa9ff: '#a891ff',
  xccd9: '#cecfd9',
  x1956: '#1f9956',
  x3c6e: '#31c46e',
  xfb2e: '#ffbd2e',
  xe364: '#e63964',
  xf25c: '#ff265c'
};

module.exports = {
  fontFamily, lineHeight, spacing, size, negative, colors, borderRadius, zIndex, fontSize, leading
};
