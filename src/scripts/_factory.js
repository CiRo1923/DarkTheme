export const svgRequire = (req) => {
  const use = Array.prototype.slice.call(document.getElementsByTagName('use'));
  use.forEach(elem => {
    const { href } = elem;
    const svg = `${/(?!#).*/.exec(href.baseVal)[0]}.svg`;
    let files = {};

    req.keys().forEach(filename => {
      if (new RegExp(filename).test(svg)) {
        files[filename] = req(filename);
      }
    });
  });
};

export let j$ = null;
export let eventQueue = [];

if (typeof j$ === 'undefined') {
  window.j$ = {};
}

document.addEventListener('DOMContentLoaded', () => {
  eventQueue.forEach(fn => {
    fn();
  });
}, { passive: true });

j$ = arg => {
  var htmlEls;
  var matches;

  if (arg instanceof Function) {
    eventQueue.push(arg);
    return document;
  } if (arg instanceof Object) {
    return new j$.Fn([arg]);
  }
  if (arg instanceof HTMLElement) {
    htmlEls = [arg];
  } else {
    matches = arg ? arg.match(/^<(\w+)>$/) : null;

    if (matches) {
      htmlEls = [document.createElement(matches[1])];
    } else {
      htmlEls = Array.prototype.slice.call(document.querySelectorAll(arg));
    }
  }

  return new j$.Fn(htmlEls);
};

j$.Fn = function (elements) {
  this[0] = elements;
  return this;
};

j$.Fn.prototype = {
  html: function (string) {
    if (typeof string !== 'undefined') {
      this[0].forEach(el => {
        el.innerHTML = string;
      });

      return this;
    }
    return this[0][0].innerHTML;
  },
  text: function (string) {
    let text = '';

    if (typeof string !== 'undefined') {
      this[0].forEach(el => {
        el.innerText = string;
      });

      return this;
    }

    this[0].forEach(el => {
      text += el.innerText;
    });

    return text;
  },
  parents: function (className) {
    let target = this[0][0];
    let $parents = null;

    while (target.parentNode != null && target.parentNode !== document.documentElement) {
      if (target.matches) {
        if (target.matches(className)) {
          $parents = new j$.Fn([target]);
          break;
        }
      } else if (target.msMatchesSelector) {
        if (target.msMatchesSelector(className)) {
          $parents = new j$.Fn([target]);
          break;
        }
      }
      target = target.parentNode;
    }
    return $parents;
  },
  parent: function () {
    var parents = [];
    var currentParent = null;

    this[0].forEach(el => {
      currentParent = el.parentElement;

      if (parents.indexOf(currentParent) === -1) {
        parents.push(currentParent);
      }
    });

    return new j$.Fn(parents);
  },
  prev: function () {
    let prev = null;

    this[0].forEach(el => {
      prev = el.previousElementSibling;
    });

    return new j$.Fn([prev]);
  },
  next: function () {
    let next = null;

    this[0].forEach(el => {
      next = el.nextElementSibling;
    });

    return new j$.Fn([next]);
  },
  find: function (selector) {
    let matchingElements = [];
    let currentMatchesQuery = null;
    let currentMatches = null;

    this[0].forEach(el => {
      const className = el.className ? `.${el.className.replace(/(?!\s)(\W)/g, '\\$1').replace(/\s/g, '.')}` : null;

      currentMatchesQuery = /^\s?>/.test(selector)
        ? document.querySelectorAll(`${className} ${selector.replace(/^\s/, '')}`)
        : el.querySelectorAll(selector);
      currentMatches = Array.prototype.slice.call(currentMatchesQuery);
      currentMatches.forEach(match => {
        if (matchingElements.indexOf(match) === -1) {
          matchingElements.push(match);
        }
      });
    });

    return new j$.Fn(matchingElements);
  },
  children: function (tagName) {
    let children = [];

    this[0].forEach(el => {
      for (let i = 0; i < el.children.length; i += 1) {
        const $children = el.children[i];

        if (tagName) {
          if ((/^./.test(tagName) && $children.className === tagName) || (/^#/.test(tagName) && $children.id === tagName)) {
            children.push($children);
          } else if ($children.nodeName.toLowerCase() === tagName) {
            children.push($children);
          }
        } else {
          children.push($children);
        }
      }
    });

    return new j$.Fn(children);
  },
  siblings: function () {
    let sibling = this[0][0].parentNode.firstChild;
    let siblings = [];

    while (sibling) {
      if (sibling.nodeType === 1 && sibling !== this[0][0]) {
        siblings.push(sibling);
      }

      sibling = sibling.nextSibling;
    }

    return new j$.Fn(siblings);
  },
  closest: function (selector) {
    if (!Element.prototype.matches) {
      Element.prototype.matches = Element.prototype.msMatchesSelector
      || Element.prototype.webkitMatchesSelector;
    }

    if (!Element.prototype.closest) {
      Element.prototype.closest = function (s) {
        var el = this;
        if (!document.documentElement.contains(el)) return null;
        do {
          if (el.matches(s)) return el;
          el = el.parentElement;
        } while (el !== null);
        return null;
      };
    }

    let closest = null;
    this[0].forEach(el => {
      closest = el.closest(selector);
    });

    return new j$.Fn([closest]);
  },
  click: function () {
    this[0].forEach(el => {
      el.click();
    });

    return this;
  },
  trigger: function (eventName) {
    this[0].forEach(el => {
      let event = document.createEvent('Event');
      event.initEvent(eventName, true, true);
      el.dispatchEvent(event);
    });

    return this;
  },
  hover: function (mouseoverhandle, mouseouthandle) {
    this[0].forEach(el => {
      el.addEventListener('mouseenter', mouseoverhandle, { passive: false });
      el.addEventListener('mouseleave', mouseouthandle || mouseoverhandle, { passive: false });
    });

    return this;
  },
  on: function (eventName, elementSelector, handle) {
    this[0].forEach(el => {
      if (elementSelector && typeof elementSelector === 'string') {
        if (eventName === 'ready') {
          el.addEventListener('DOMContentLoaded', e => {
            handle.call(e);
          }, { passive: false });
        } else {
          el.addEventListener(eventName, e => {
            for (let target = e.target; target && target !== this; target = target.parentNode) {
              if (target.matches) {
                if (target.matches(elementSelector)) {
                  e.$this = target;
                  handle.call(target, e);
                  break;
                }
              } else if (target.msMatchesSelector) {
                if (target.msMatchesSelector(elementSelector)) {
                  e.$this = target;
                  handle.call(target, e);
                  break;
                }
              }
            }
          }, { passive: false });
        }
      } else {
        const func = elementSelector;

        if (eventName === 'ready') {
          el.addEventListener('DOMContentLoaded', e => {
            func.call(e);
          }, { passive: false });
        } else {
          el.addEventListener(eventName, e => {
            e.$this = el;
            func.call(e.target, e);
          }, { passive: false });
        }
      }
    });

    return this;
  },
  off: function (eventName, elementSelector, handle) {
    this[0].forEach(function (el) {
      if (elementSelector && typeof elementSelector === 'string') {
        el.removeEventListener(eventName, function (e) {
          for (let target = e.target; target && target !== this; target = target.parentNode) {
            if (target.matches) {
              if (target.matches(elementSelector)) {
                e.$this = target;
                handle.call(target, e);
                break;
              }
            } else if (target.msMatchesSelector) {
              if (target.msMatchesSelector(elementSelector)) {
                e.$this = target;
                handle.call(target, e);
                break;
              }
            }
          }
        }, { passive: false });
      } else {
        const func = elementSelector || null;
        el.removeEventListener(eventName, e => {
          e.$this = el;
          func.call(e.target, e);
        }, { passive: false });
      }
    });

    return this;
  },
  addClass: function (className) {
    this[0].forEach(el => {
      el.classList.add(className);
    });

    return this;
  },
  removeClass: function (className) {
    this[0].forEach(el => {
      el.classList.remove(className);
    });

    return this;
  },
  toggleClass: function (className) {
    this[0].forEach(el => {
      el.classList.toggle(className);
    });

    return this;
  },
  hasClass: function (className) {
    let hasClass = false;

    this[0].forEach(el => {
      hasClass = el ? new RegExp('(\\s|^)' + className + '(\\s|$)').test(el.className) : false;
      // if (el.className.replace(/[\n\t]/g, ' ').indexOf(className) > -1) {
      //   hasClass = true;
      // } else {
      //   hasClass = false;
      // }
    });

    return hasClass;
  },
  attr: function (attributeName, attributeValue) {
    if (typeof attributeValue !== 'undefined') {
      this[0].forEach(el => {
        el.setAttribute(attributeName, attributeValue);
      });

      return this;
    }
    return this[0][0].getAttribute(attributeName);
  },
  data: function (attributeName, attributeValue) {
    if (typeof attributeValue !== 'undefined') {
      this[0].forEach(el => {
        el.dataset[attributeName] = attributeValue;
      });

      return this;
    }
    return this[0][0].dataset[attributeName];
  },
  removeAttr: function (attributeName) {
    this[0].forEach(el => {
      el.removeAttribute(attributeName);
    });

    return this;
  },
  width: function () {
    let width = '';

    this[0].forEach(el => {
      width = el.innerWidth || el.offsetWidth || el.scrollWidth || el.clientWidth;
    });

    return width;
  },
  height: function () {
    let height = '';

    this[0].forEach(el => {
      height = el.innerHeight || el.offsetHeight || el.scrollHeight || el.clientHeight;
    });

    return height;
  },
  css: function (style, value) {
    if (typeof style !== 'undefined' && typeof value !== 'undefined') {
      this[0].forEach(el => {
        el.style[style] = value;
      });

      return this;
    }
    return getComputedStyle(this[0][0])[style];
  },
  empty: function () {
    while (this[0][0].firstChild) {
      this[0][0].removeChild(this[0][0].firstChild);
    }

    return this;
  },
  remove: function () {
    this[0].forEach(function (el) {
      if (!('remove' in Element.prototype)) {
        el.parentNode.removeChild(el);
      } else {
        el.remove();
      }
    });
  },
  append: function (arg) {
    if (arg instanceof j$.Fn) {
      arg[0].forEach(function (el) {
        const elem = el.length ? el.cloneNode(true) : el;
        this[0][0].appendChild(elem);
      }.bind(this));
    } else if (arg instanceof HTMLElement) {
      const child = arg.length ? arg.cloneNode(true) : arg;
      this[0][0].appendChild(child);
    } else if (typeof arg === 'string') {
      this[0].forEach(el => {
        el.innerHTML += arg;
      });
    }

    return this;
  },
  before: function (arg) {
    if (arg instanceof j$.Fn) {
      arg[0].forEach(function (el) {
        this[0][0].parentNode.insertBefore(el, this[0][0]);
      }.bind(this));
    }

    return this;
  },
  after: function (arg) {
    if (arg instanceof j$.Fn) {
      arg[0].forEach(function (el) {
        if (this[0][0].parentNode.lastChild === this[0][0]) {
          this[0][0].parentNode.appendChild(el, this[0][0]);
        } else {
          this[0][0].parentNode.insertBefore(el, this[0][0].nextSibling);
        }
      }.bind(this));
    }

    return this;
  },
  val: function (value) {
    if (typeof value !== 'undefined') {
      this[0].forEach(el => {
        el.value = value;
      });

      return this;
    }
    return this[0][0].value;
  },
  offset: function () {
    const wScroll = {
      y: /(iPhone||iPad)\W+.*\sOS\s12_/.test(navigator.userAgent) ? window.scrollY : 0
    };
    let $el = this[0][0];
    let top = 0;
    let left = 0;

    while ($el && typeof ($el.offsetLeft) !== 'undefined' && typeof ($el.offsetTop) !== 'undefined') {
      top += $el.offsetTop - $el.scrollTop + $el.clientTop;
      left += $el.offsetLeft - $el.scrollLeft + $el.clientLeft;

      $el = $el.offsetParent;
    }

    return { top: (top + wScroll.y), left: left };
  },
  position: function () {
    let $el = this[0][0];
    let top = 0;
    let left = 0;
    let parentTop = $el.offsetParent.offsetTop;
    let parentLeft = $el.offsetParent.offsetLeft;

    while ($el) {
      top += $el.offsetTop - $el.scrollTop + $el.clientTop;
      left += $el.offsetLeft - $el.scrollLeft + $el.clientLeft;

      $el = $el.offsetParent;
    }

    return { top: (top - parentTop), left: (left - parentLeft) };
  },
  prop: function (type, value) {
    let prop = null;

    if (typeof value !== 'undefined') {
      this[0].forEach(el => {
        el[type] = value;
      });

      return this;
    }

    this[0].forEach(el => {
      prop = el[type];
    });

    return prop;
  },
  eq: function (index) {
    return new j$.Fn([typeof this[0][0][0] !== 'undefined' ? this[0][0][0][index] : this[0][index]]);
  },
  index: function () {
    const children = this[0][0].parentNode.children;

    let num = 0;
    for (let i = 0; i < children.length; i += 1) {
      if (children[i] === this[0][0]) {
        return num;
      }
      if (children[i].nodeType === 1) {
        num += 1;
      }
    }
    return -1;
  }
};

export const prjs = {
  $w: j$(window),
  $d: j$(document),
  $hb: j$('html, body'),
  $b: j$('body')
};

/* device */
export const device = () => {
  let angle = window.screen.orientation ? window.screen.orientation.angle : 0;

  if (prjs.$w.width() <= 740 || /Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    return 'M';
  }
  if ((angle === 0 && prjs.$w.width() > 740 && prjs.$w.width() < 1024) || /Android|webOS|iPad|BlackBerry/i.test(navigator.userAgent)) {
    return 'T';
  } if ((angle !== 0 && prjs.$w.width() > 730 && prjs.$w.width() < 815) || /iPhone/i.test(navigator.userAgent)) {
    return 'M';
  }
  return 'P';
};

export const validate = {
  req: value => {
    return !!value;
  },
  reqZero: value => {
    return !!((value || value === 0));
  },
  digit: value => {
    return /^\d+$/.test(value);
  },
  decimal: value => {
    return /^\d+\.?(\d+)?$/.test(value);
  },
  phone: value => {
    return /^09\d{8}$/.test(value);
  },
  password: (value, length) => {
    return new RegExp(`^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{${length},}$`).test(value);
  },
  same: (value, checkValue) => {
    return (value === checkValue);
  }
};

export const scrollTo = obj => {
  const top = (obj.top ? obj.top : 0);
  const left = (obj.left ? obj.left : 0);
  const supportsNativeSmoothScroll = 'scrollBehavior' in document.documentElement.style;
  const nativeSmoothScrollTo = () => {
    window.scroll({
      top: top,
      left: left,
      behavior: 'smooth'
    });
  };
  const smoothScrollTo = () => {
    const element = document.scrollingElement || document.documentElement;
    const start = element.scrollTop;
    const change = (top - start);
    const startDate = +new Date();
    const easeInOutQuad = (t, b, c, d) => {
      let T = (t / (d / 2));
      if (T < 1) return (c / 2) * T * T + b;
      T = (t - 1);
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    const animateScroll = () => {
      const currentDate = +new Date();
      const currentTime = currentDate - startDate;
      element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, 600), 10);
      if (currentTime < 600) {
        requestAnimationFrame(animateScroll);
      } else {
        element.scrollTop = top;
      }
    };
    animateScroll();
  };

  if (supportsNativeSmoothScroll) {
    nativeSmoothScrollTo();
  } else {
    smoothScrollTo();
  }
};
