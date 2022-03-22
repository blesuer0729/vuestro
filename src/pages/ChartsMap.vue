<template>
  <vuestro-container no-wrap>
    <vuestro-card color="var(--vuestro-purple)" overflow-hidden>
      <template #heading><span class="drag">Map</span></template>
      <template #description>VuestroMap uses Leaflet with some nice additions for power users. Define the markers prop use different data and draw markers.
      </template>
      <vuestro-panel stretch overflow-hidden>
        <vuestro-map :data="data" :options="options" @click="onMapClick">
          <template #popup-content="{ item }">
            <vuestro-button @click="onTestButton(item)">button with access to data</vuestro-button>
          </template>
        </vuestro-map>
      </vuestro-panel>
    </vuestro-card>
  </vuestro-container>
</template>

<script>

import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.js';
// differentiate data generated and user drawn markers with two divIcons
const clusterIconSvg = {
  mapIconUrl: '<svg width="100%" height="100%" viewBox="0 0 289 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><g transform="matrix(1,0,0,1,-442.225,-95.7423)"><path d="M586.374,95.742C665.931,95.742 730.522,160.333 730.522,239.891C730.522,361.821 586.374,607.562 586.374,607.562C586.374,607.562 442.225,361.937 442.225,239.891C442.225,160.333 506.816,95.742 586.374,95.742ZM586.374,164.092C628.208,164.092 662.173,198.056 662.173,239.891C662.173,281.726 628.208,315.69 586.374,315.69C544.539,315.69 510.575,281.726 510.575,239.891C510.575,198.056 544.539,164.092 586.374,164.092Z" style="fill:var(--vuestro-primary);"/></g></svg>',
};

const geomanIconSvg = {
  mapIconUrl: '<svg width="100%" height="100%" viewBox="0 0 289 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><g transform="matrix(1,0,0,1,-442.225,-95.7423)"><path d="M586.374,95.742C665.931,95.742 730.522,160.333 730.522,239.891C730.522,361.821 586.374,607.562 586.374,607.562C586.374,607.562 442.225,361.937 442.225,239.891C442.225,160.333 506.816,95.742 586.374,95.742ZM586.374,164.092C628.208,164.092 662.173,198.056 662.173,239.891C662.173,281.726 628.208,315.69 586.374,315.69C544.539,315.69 510.575,281.726 510.575,239.891C510.575,198.056 544.539,164.092 586.374,164.092Z" style="fill:var(--vuestro-orange);"/></g></svg>',
};

const clusterIcon = L.divIcon({
  className: 'data-icon',
  popupAnchor: [0, -15],
  iconSize: [25,40],
  html: L.Util.template(clusterIconSvg.mapIconUrl),
});

const geomanIcon = L.divIcon({
  className: 'user-icon',
  iconAnchor: [12, 35],
  popupAnchor: [0, -30],
  iconSize: [25,40],
  html: L.Util.template(geomanIconSvg.mapIconUrl),
});

export default {
  name: 'ChartsMap',
  data() {
    return {
      options: {
        dataCoordinateKey: 'value',
        dataExtraKvps: ['Rating'],
      },
      data: [],
      markers: {
        data: {
          icon: clusterIcon,
        },
        draw: {
          icon: geomanIcon,
        }
      }
    };
  },
  mounted() {
    this.data = [
      {
        title: 'Port Royale - Temporary Tattoos stand',
        value: [28.36269,-81.54225],
        Rating: 3,
      },
      {
        title: 'Port Royale (FQ) pool',
        value: [28.3627,-81.54252],
        Rating: 2,
      },
      {
        title: 'Port Royale (FQ) entrance',
        value: [28.36288,-81.54222],
        Rating: 4,
      },
      {
        title: 'Wishes fireworks from boat',
        value: [28.41264,-81.58053],
        Rating: 5,
      },
      {
        title: 'Flag at start of Main Street',
        value: [28.4169,-81.58125],
        Rating: 3,
      },
      {
        title: 'Main Street',
        value: [28.41709,-81.58126],
        Rating: 1,
      },
      {
        title: 'Main Street-middle I think',
        value: [28.41756,-81.5812],
        Rating: 2,
      },
      {
        title: 'Main Street end',
        value: [28.41804,-81.58122],
        Rating: 2,
      },
      {
        title: 'Pirates of the Caribbean',
        value: [28.41808,-81.58429],
        Rating: 3,
      },
      {
        title: 'Jungle Cruise',
        value: [28.41824,-81.58349],
        Rating: 4,
      },
      {
        title: 'Crystals Palace',
        value: [28.41827,-81.58191],
        Rating: 5,
      },
      {
        title: 'Adventureland entrance and benches',
        value: [28.41848,-81.58206],
        Rating: 3,
      },
      {
        title: 'Swiss Family Treehouse',
        value: [28.41849,-81.5828],
        Rating: 3,
      },
      {
        title: 'Alien Encounter',
        value: [28.41853,-81.57949],
        Rating: 2,
      },
      {
        title: 'Luncheon Pad-turkey legs-food',
        value: [28.4186,-81.57912],
        Rating: 3,
      },
      {
        title: ' Frontier Fries-Adventure Land-Mcdonalds fries',
        value: [28.41864,-81.58471],
        Rating: 1,
      },
      {
        title: 'Walt and Mickey Statue',
        value: [28.41883,-81.58123],
        Rating: 2,
      },
      {
        title: 'Space Mountain Entrance',
        value: [28.41883,-81.57832],
        Rating: 3,
      },
      {
        title: 'Mad Tea Party',
        value: [28.4189,-81.57951],
        Rating: 4,
      },
      {
        title: 'Cinderella\'s Castle South side',
        value: [28.41945,-81.5812],
        Rating: 5,
      },
      {
        title: 'Cinderella\'s Castle North side',
        value: [28.41972,-81.58116],
        Rating: 3,
      },
      {
        title: 'Sir Mickeys',
        value: [28.41993,-81.58133],
        Rating: 3,
      },
      {
        title: 'Mickey\'s Philharmagic',
        value: [28.42007,-81.58133],
        Rating: 5,
      },
      {
        title: 'Snow White Scary Adventure',
        value: [28.4201,-81.58101],
        Rating: 4,
      },
      {
        title: 'Haunted Mansion Entrance',
        value: [28.42016,-81.58284],
        Rating: 1,
      },
      {
        title: 'Carousel of Progress',
        value: [28.42017,-81.58141],
        Rating: 2,
      },
      {
        title: 'Mad Hatter',
        value: [28.42018,-81.57958],
        Rating: 2,
      },
      {
        title: 'Winnie the Pooh',
        value: [28.42023,-81.58024],
        Rating: 2,
      },
      {
        title: 'It\'s a Small World',
        value: [28.42033,-81.58211],
        Rating: 3,
      },
      {
        title: 'Dumbo ride',
        value: [28.4205,-81.58084],
        Rating: 3,
      },
      {
        title: 'Cinderella\'s castle',
        value: [28.42053,-81.58103],
        Rating: 2,
      },
    ];
  },
  methods: {
    onTestButton(d) {
      alert(JSON.stringify(d,null,2));
    },
  },
};

</script>


<style scoped>


</style>