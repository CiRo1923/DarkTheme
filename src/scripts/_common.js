import axios from 'axios';
import LazyLoad from 'vanilla-lazyload';
import {
  prjs, j$, svgRequire, device, validate
} from '_factory.js';

let lazyLoadFun = () => {
  return new LazyLoad({
    elements_selector: '.lazy',
    use_native: true
  });
};

/* 一次載入使用到的 svg */
svgRequire(require.context('../_svg/', true, /\.svg$/));

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
      const tenItem = tneElemEq.find('.jTnsItem');
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

        if (tenItemElem.hasClass('active')) {
          startIndex = tenItemElem.index();
        }
      }

      tnsSlide = tns({
        ...{
          container: elem,
          startIndex: startIndex,
          autoplayButtonOutput: false,
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

        if (!tneSet.autoplay && !tneSet.loop) {
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
      }

      resizeFuns();

      prjs.$w.on('resize', () => {
        resizeFuns();
      });
    });
  }
};

export const swich = () => {
  const swichClass = {
    main: '.jSwich',
    btn: '.jSwichBtn',
    slide: '.jSwichSlide'
  };
  const $btn = j$(swichClass.btn);

  $btn.on('click', (e) => {
    const $this = j$(e.$this);
    const $swich = $this.parents(swichClass.main);
    const $slide = $swich.find(swichClass.slide);
    const index = $this.parent().index();

    $this.parent().addClass('active').siblings().removeClass('active');
    $slide.css('transform', `translateX(${(-100 * index)}%)`);
  });
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

const marquee = (set) => {
  const box = j$('.jMarquee');
  const text = j$('.jMarqueeTxt');
  const boxWidth = box.width();
  const txtWidth = text.width(true);
  let initLeft = set?.autoplay ? boxWidth : 0;
  const runFun = () => {
    setInterval(() => {
      if (initLeft < txtWidth * -1) {
        initLeft = boxWidth;
      }
      initLeft -= 1;
      text.css('transform', `translateX(${initLeft}px)`);
    }, set?.speed ? set.speed : 10);
  };

  if (set?.autoplay) {
    runFun();
  } else if (boxWidth < txtWidth) {
    runFun();
  }
};

j$('[\\:validate]').on('blur', e => {
  const $this = j$(e.$this);

  validate($this);
});

prjs.$d.on('click', '.jSubmit', e => {
  const $cxt = j$('[\\:validate]');
  const $pop = j$('.jPop');
  let isError = 0;

  $cxt[0].forEach(el => {
    validate(j$(el), error => {
      if (error) {
        isError += 1;
      }
    });
  });

  if (isError !== 0) {
    e.preventDefault();
  } else if (j$('[\\:ajax]').attr(':ajax')) {
    const $form = j$('[\\:ajax]');
    const url = $form.attr(':ajax');
    const method = /method=([^?&#]*)/.exec(url)[1];
    const formdata = /formdata=([^?&#]*)/.exec(url)[1];
    const getData = () => {
      const kvpairs = {};
      for (let i = 0; i < $form.find('[name]')[0].length; i += 1) {
        const elem = $form.find('[name]')[0][i];
        kvpairs[elem.name] = elem.value;
      }

      return kvpairs;
    };
    const formData = (data) => {
      const newFormData = new FormData();
      Object.keys(data).forEach(key => {
        newFormData.append(key, data[key]);
      });

      return newFormData;
    };
    const axiosApi = method === 'post' ? axios.post : axios.get;
    const data = formdata ? formData(getData()) : getData();
    axiosApi(url, data).then(() => {
      $pop.addClass('act');
    });
  } else {
    j$('form')[0][0].submit();
  }
});

prjs.$d.on('ready', () => {
  lazyLoadFun();
});

prjs.$w.on('load', () => {
  dropdown();
  langChange();
  marquee({
    autoplay: true
  });
});
