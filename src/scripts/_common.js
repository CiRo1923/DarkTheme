import LazyLoad from 'vanilla-lazyload';
import {
  prjs, j$, svgRequire, device
} from '_factory.js';

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

      // eslint-disable-next-line no-param-reassign
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

/* DropDown */
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

  // $dropCtrl.on('click', (e) => {
  //   const $this = j$(e.$this);
  //   const $drop = $this.parents(dropClass.main);

  //   // j$(dropClass.main).removeClass('active');
  //   $drop.toggleClass('active');

  //   documentOff(`${dropClass.main} > *`, () => {
  //     j$(dropClass.main).removeClass('active');
  //   });
  // });
};

/* tinySlider */
export const tinySlider = (tns) => {
  const tneElem = j$('.jTns');

  if (tneElem[0].length !== 0) {
    tneElem[0].forEach(elem => {
      let tnsSlide = null;
      const tneElemEq = j$(elem);
      const tenItem = tneElemEq.children('.jTnsItem');
      const tneSet = tneElemEq.attr(':set') ? JSON.parse(tneElemEq.attr(':set').replace(/'/g, '"')) : {};
      let startIndex = 0;
      let newSet = {};
      const resizeFuns = () => {
        if (tneSet.destroy) {
          const notEqual = /^!/.test(tneSet.destroy);
          const destroyDevice = notEqual ? /(?!^!).*/.exec(tneSet.destroy)[0] : tneSet.destroy;

          if (notEqual) {
            if (device() !== destroyDevice) {
              if (tnsSlide.destroy) {
                tnsSlide.destroy();
              }
            } else if (!tnsSlide.destroy) {
              tnsSlide = tnsSlide.rebuild();
            }
          } else if (device() !== destroyDevice) {
            if (!tnsSlide.destroy) {
              tnsSlide = tnsSlide.rebuild();
            }
          } else if (tnsSlide.destroy) {
            tnsSlide.destroy();
          }
        }
      };

      Object.keys(tneSet).forEach(key => {
        if (tneSet[key] instanceof Object) {
          if (!newSet.responsive) {
            newSet.responsive = {
              1: {},
              768: {},
              1000: {}
            };
          }

          newSet.responsive['1'][key] = tneSet[key].m;
          newSet.responsive['768'][key] = tneSet[key].t;
          newSet.responsive['1000'][key] = tneSet[key].p;
        } else {
          newSet[key] = tneSet[key];
        }
      });

      for (let j = 0; j < tenItem[0].length; j += 1) {
        const tenItemElem = tenItem.eq(j);

        if (tenItemElem.hasClass('act')) {
          startIndex = tenItemElem.parent().index();
        }
      }

      tnsSlide = tns({
        ...{
          container: elem,
          startIndex: startIndex,
          navPosition: tneSet.navPosition ? tneSet.navPosition : 'bottom'
        },
        ...newSet
      });

      if (tneSet.prevElem && tneSet.nextElem) {
        j$(tneSet.prevElem).on('click', e => {
          const $this = j$(e.$this);
          if (!$this.prop('disabled')) {
            tnsSlide.goTo('prev');
          }
        });

        j$(tneSet.nextElem).on('click', e => {
          const $this = j$(e.$this);

          if (!$this.prop('disabled')) {
            tnsSlide.goTo('next');
          }
        });

        tnsSlide.events.on('indexChanged', info => {
          const $prev = j$(tneSet.prevElem);
          const $next = j$(tneSet.nextElem);

          $prev.prop('disabled', false);
          $next.prop('disabled', false);

          if (info.slideCount - info.items - info.index <= 0) {
            $next.prop('disabled', true);
          } else if (info.index === 0) {
            $prev.prop('disabled', true);
          }
        });
      }

      resizeFuns();

      prjs.$w.on('resize', () => {
        resizeFuns();
      });
    });
  }
};

const langChange = () => {
  const dropClass = {
    main: '.jDropLang',
    ctrl: '.jDropCtrl',
    option: '.jDropOption'
  };

  const $dropOption = j$(`${dropClass.main} ${dropClass.option}`);

  $dropOption.on('click', (e) => {
    const $this = j$(e.$this);
    const $dropImg = $this.parents(dropClass.main).find(`${dropClass.ctrl} img`);

    $dropImg.attr('src', $this.data('flag'));
    j$(dropClass.main).removeClass('active');
  });
};

prjs.$d.on('ready', () => {
  lazyLoadFun();
});

prjs.$w.on('load', () => {
  dropdown();
  langChange();
});
