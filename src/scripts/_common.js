import LazyLoad from 'vanilla-lazyload';
import { prjs, j$, svgRequire } from '_factory.js';

let lazyLoadFun = () => {
  return new LazyLoad({
    elements_selector: '.lazy',
    use_native: true
  });
};

/* 一次載入使用到的 svg */
svgRequire(require.context('../_svg/', true, /\.svg$/));

/* documentOff */
export const documentOff = (element, func) => {
  let isClick = 0;
  const elem = element.split(',');
  const composedPath = (el) => {
    let path = [];

    while (el) {
      path.push(el);

      if (el.tagName === 'HTML') {
        path.push(document);
        path.push(window);
        return path;
      }

      el = el.parentElement;
    }

    return null;
  };
  const matchesElem = e => {
    const path = e.path || (e.composedPath && e.composedPath()) || composedPath(e.target);
    let matches = false;
    const same = (ele) => {
      path.some(el => {
        if (el === ele) {
          matches = true;
          isClick += 1;
          return false;
        }

        return null;
      });
    };

    e.stopPropagation();

    for (let i = 0; i < elem.length; i += 1) {
      const $elem = document.querySelectorAll(elem[i].replace(/^\s/, ''));

      for (let j = 0; j < $elem.length; j += 1) {
        same($elem[j]);
      }
    }

    if (!matches && func) {
      if (isClick >= 1) {
        isClick = 0;
        func.call();
      }
      document.removeEventListener('click', matchesElem, false);
    }
  };

  document.addEventListener('click', matchesElem, false);
};

export const dropdown = () => {
  const dropClass = {
    main: '.jDrop',
    ctrl: '.jDropCtrl',
    bd: '.jDropBd'
  };
  const $dropCtrl = j$(dropClass.ctrl);

  for (let i = 0; i < $dropCtrl[0].length; i += 1) {
    const $drop = j$($dropCtrl).eq(i).parents(dropClass.main);
    const $dropBd = $drop.find(dropClass.bd);
    const height = `${$drop.find(`${dropClass.bd} > *`).height() + parseFloat($drop.find(`${dropClass.bd} > *`).css('margin-top'), 10)}px`;

    $dropBd.css('max-height', height);
  }

  $dropCtrl.on('click', (e) => {
    const $this = j$(e.$this);
    const $drop = $this.parents(dropClass.main);

    j$(dropClass.main).removeClass('active');
    $drop.toggleClass('active');

    documentOff(`${dropClass.main} > *`, () => {
      j$(dropClass.main).removeClass('active');
    });
  });
};

prjs.$d.on('ready', () => {
  lazyLoadFun();
});

prjs.$w.on('load', () => {
  dropdown();
});
