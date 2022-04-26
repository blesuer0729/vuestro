/* global _ */

import VuestroMixins from './mixins';

export default {
  install(Vue, options) {
    //
    // COMPONENT REGISTRATION, FINDS ALL .vue FILES in the /components directory
    // AND ADDS THEM USING THE name: FIELD
    //
    let modules = require.context('../components', true, /\.vue$/, 'sync');
    for (let m of modules.keys()) {
      // console.info(`importing ${m}`);
      let module = modules(m).default;
      Vue.component(module.name, module);
    }

    //
    // FILTERS
    //
    // filter to add commas to a number
    Vue.filter('vuestroCommas', (d) => {
      if (d === null || d === undefined) {
        return '';
      }
      if (typeof(d) === 'number') {
        return Number(d).toLocaleString('en');
      }
      if (typeof(d) === 'string') {
        let n = Number(parseFloat(d)).toLocaleString('en');
        if (!isNaN(n)) {
          return n;
        }
      }
      return d;
    });
    // filter to render a group of 10 digits as a US phone number
    Vue.filter('vuestroPhoneUS', (d) => {
      if (d === null || d === undefined) {
        return '';
      }
      if (typeof(d) === 'number') {
        d = `${d}`;
      }
      return d.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    });
    // render the given string or UNIX time or date object as HH:MM:SS
    Vue.filter('vuestroHMS', (d) => {
      let hours, minutes, seconds;
      if (d === null || d === undefined) {
        return '';
      } else if (_.isString(d)) {
        d = new Date(d);
        hours = d.getHours();
        minutes = d.getMinutes();
        seconds = d.getSeconds();
      } else if (_.isNumber(d)) {
        d = new Date(parseInt(d, 10)*1000);
        hours = d.getUTCHours();
        minutes = d.getUTCMinutes();
        seconds = d.getUTCSeconds();
      }
      return `${('0' + hours).slice(-2)}:${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}`;
    });
    // render the given string or UNIX time or date object as ISO8601
    Vue.filter('vuestroIsoDate', (d) => {
      if (d === null || d === undefined) {
        return '';
      } else if (_.isString(d)) {
        d = new Date(d);
      } else if (_.isNumber(d)) {
        d = new Date(parseInt(d, 10)*1000);
      }
      return d.toISOString();
    });
    // render the given string or UNIX time or date object as a local datetime
    Vue.filter('vuestroDate', (d) => {
      if (d === null || d === undefined) {
        return '';
      } else if (_.isString(d)) {
        d = new Date(d);
      } else if (_.isNumber(d)) {
        d = new Date(parseInt(d, 10)*1000);
      }
      return d.toLocaleString();
    });
    // render the given string or UNIX time or date object as a local date only
    Vue.filter('vuestroLocaleDate', (d) => {
      if (d === null || d === undefined) {
        return '';
      } else if (_.isString(d)) {
        d = new Date(d);
      } else if (_.isNumber(d)) {
        d = new Date(parseInt(d, 10)*1000);
      }
      return d.toLocaleDateString();
    });
    // render the given string or UNIX time or date object as a local time only
    Vue.filter('vuestroLocaleTime', (d) => {
      if (d === null || d === undefined) {
        return '';
      } else if (_.isString(d)) {
        d = new Date(d);
      } else if (_.isNumber(d)) {
        d = new Date(parseInt(d, 10)*1000);
      }
      return d.toLocaleTimeString();
    });
    // filter to humanize a byte count with the ppropriate suffix, uses 1k=1000
    Vue.filter('vuestroBytes', (intNum) => {
      if (intNum === null || intNum === undefined) {
        return '';
      }
      const suffixes = ['B', 'kB', 'MB', 'GB', 'TB', 'PB'];
      if (intNum < 1000) {
        return intNum.toFixed(1) + suffixes[0];
      }
      let i = parseInt(Math.floor(Math.log(intNum) / Math.log(1000)), 10);
      return (intNum / Math.pow(1000, i)).toFixed(1) + suffixes[i];
    });
    // filter to humanize a number with an appropriate suffix
    Vue.filter('vuestroHumanNum', (intNum) => {
      if (intNum == null || intNum === undefined) {
        return '';
      }
      const suffixes = ['k', 'M', 'B', 'T', 'Qd', 'Qn', 'Sx', 'Sp', 'O', 'N', 'D', 'G', 'Gp'];
      if (intNum < 1000) {
        return intNum % 1 > 0 ? intNum.toFixed(1):intNum;
      }
      let i = parseInt(Math.floor(Math.log(intNum) / Math.log(1000)), 10) - 1;
      return (intNum / Math.pow(1000, i+1)).toFixed(1) + suffixes[i];
    });
    // filter for title case, attempt to be smart about titling rules
    Vue.filter('vuestroTitleCase', (str) => {
      return str.split(' ').map(function(word, idx) {
        let exceptions = [
          // short conjunctions
          'and', 'as', 'but', 'for', 'if', 'nor', 'or', 'so', 'yet',
          // articles
          'a', 'an', 'the',
          // short prepositions
          'as', 'at', 'by', 'in', 'of', 'off', 'on', 'per', 'to', 'up', 'via',
          // Apple words
          'iOS', 'macOS', 'iCloud',
        ];
        if (idx === 0 || exceptions.indexOf(word) < 0) {
          let hyphenated = word.split('-');
          if (hyphenated.length > 1) {
            return hyphenated.map(function(word) {
              return word.replace(word[0], word[0].toUpperCase());
            }).join('-');
          }
          return word.replace(word[0], word[0].toUpperCase());
        }
        return word;
      }).join(' ');
    });
    // use by adding v-vuestro-blur="onBlur" to your element,
    // onBlur method will be called when a click event bubbles up to document.body
    // which didn't originate from within your element
    Vue.directive('vuestro-blur', {
      bind: function (el, binding, vnode) {
        el.clickOutsideEvent = function(event) {
          if (!(el == event.target || el.contains(event.target))) {
            vnode.context[binding.expression](event);
          }
        };
        document.body.addEventListener('click', el.clickOutsideEvent);
      },
      unbind: function (el) {
        document.body.removeEventListener('click', el.clickOutsideEvent);
      },
    });
    //
    // MIXINS
    //
    Vue.mixin(VuestroMixins);
    //
    // GLOBALS
    //
    Vue.prototype.vuestroGetRemoteComponent = async function(url) {
      const name = url.split('/').reverse()[0].match(/^(.*?)\.umd/)[1];

      if (window[name]) return window[name];

      window[name] = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.async = true;
        script.addEventListener('load', () => {
          resolve(window[name]);
        });
        script.addEventListener('error', () => {
          reject(new Error(`Error loading ${url}`));
        });
        script.src = url;
        document.head.appendChild(script);
      });

      return window[name];
    };
  }
};
