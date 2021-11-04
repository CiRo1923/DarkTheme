// 自定義 spacing、negative、borderRadius 的時候需開啟 setData
// const { setData } = require('./tailwind.function.js');

const fontFamily = 'roboto, "微軟正黑體", "Microsoft JhengHei", "Heiti TC", "黑體", sans-serif';

const lineHeight = 1.14;

const spacing = {};

const negative = {};

const borderRadius = {};

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
  x1956: '#1f9956',
  x3c6e: '#31c46e',
  xfb2e: '#ffbd2e',
  xe364: '#e63964',
  xf25c: '#ff265c'
};

module.exports = {
  fontFamily, lineHeight, spacing, negative, colors, borderRadius, zIndex, fontSize
};
