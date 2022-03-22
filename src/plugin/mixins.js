/* global _ */
import * as d3 from 'd3';
let colors = d3.scaleOrdinal(d3.schemeCategory10);

export default {
  data() {
    return {
      vuestroSearchTerm: '', // special vuestro search term
      vuestroSearchItemField: 'items', // override this if your data is in another field
    };
  },
  computed: {
    // convenience computed property to implement basic list
    // filtering on an "items" array, you can use vuestroSearchTerm in v-model for
    // a search field, and vuestroFilteredItems will react to it
    vuestroFilteredItems() {
      if (this[this.vuestroSearchItemField]) {
        if (this.vuestroSearchTerm.length > 0) {
          let regex = new RegExp(this.vuestroSearchTerm, 'i');
          return _.filter(this.items, function(o) {
            return regex.test(Object.values(o).join(' '));
          });
        } else {
          return this[this.vuestroSearchItemField];
        }
      }
      return [];
    }
  },
  methods: {
    //
    // download the given data object as JSON with the given filename
    //
    vuestroDownloadAsJson(data, filename) {
      if (!data || !filename) {
        console.error('downloadAsJSON needs data and filename params');
        return;
      }
      var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data,null,2));
      var downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", filename);
      document.body.appendChild(downloadAnchorNode); // required for firefox
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    },
    vuestroDownloadWithIframe(url) {
      let hiddenIFrameID = `vuestroDownloadWithIframe-${Date.now()}`;
      let iframe = document.createElement('iframe');
      iframe.id = hiddenIFrameID;
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      iframe.src = url;
    },
    vuestroGet(object, path, defaultVal) {
      return _.get(object, path, defaultVal);
    },
    vuestroGetValueById({ data, idField, idValue, field, backupText }) {
      let q = {};
      q[idField] = idValue;
      let doc = _.find(data, q);
      if (doc && doc[field]) {
        return doc[field];
      } else {
        return backupText;
      }
    },
    // generate a random hex string with the given length
    vuestroGenerateId(length) {
      function dec2hex (dec) {
        return dec < 10 ? '0' + String(dec):dec.toString(16);
      }
      var arr = new Uint8Array((length || 40) / 2);
      window.crypto.getRandomValues(arr);
      return Array.from(arr, dec2hex).join('');
    },
    // get the vuestro color palette
    vuestroColorPalette() {
      return [
        '--vuestro-indigo',
        '--vuestro-purple',
        '--vuestro-magenta',
        '--vuestro-pink',

        '--vuestro-prussian',
        '--vuestro-navy',
        '--vuestro-royal',
        '--vuestro-blue',
        '--vuestro-cobalt',
        '--vuestro-cyan',
        '--vuestro-teal',

        '--vuestro-green',
        '--vuestro-emerald',
        '--vuestro-yellow',
        '--vuestro-gold',

        '--vuestro-orange',
        '--vuestro-salmon',
        '--vuestro-brick',
        '--vuestro-red',
      ];
    },
    vuestroChartColorGenerator(idx) {
      return colors(idx);
    },
    // attempt to determine whether light or dark text would improve contrast
    // based on the luminosity of the provided background color
    // if bgColor is a CSS var string, then also provide el so that the CSS var
    // can be resolved relative to the provided element
    vuestroAutoTextColor(bgColor, el) {
      if (bgColor === 'transparent') {
        return 'var(--vuestro-text-color)';
      } else if (bgColor.startsWith('var(') && el) {
        // get var name by itself since most of the time
        // it will be wrapped in var(..)
        bgColor = bgColor.split(/[\(\)]/)[1];
        // resolve the var based on el
        bgColor = getComputedStyle(el).getPropertyValue(bgColor);
      }
      // use d3 to get luminosity
      let l = d3.hsl(d3.color(bgColor)).l;
      if (l > 0.55) {
        return 'var(--vuestro-text-color-dark)';
      } else {
        return 'var(--vuestro-text-color-light)';
      }
    },
  }
};