<template>
  <div class="vuestro-force-graph">
    <svg :width="width"
         :height="height"
         @mousemove="onDrag($event)"
         @mouseup="onDrop()">
      <g v-for="l in links">
        <line stroke="var(--vuestro-gray)"
              stroke-width="1"
              :x1="l.source.x"
              :y1="l.source.y"
              :x2="l.target.x"
              :y2="l.target.y">
        </line>
      </g>
      <g v-for="n in nodes">
        <circle :r="getNodeRadius(n)"
                :fill="getNodeColor(n)"
                :cx="n.x"
                :cy="n.y"
                @mousedown="onSelectNode(n)">
        </circle>
        <text v-if="labels && n.x !== undefined && n.y !== undefined"
              class="vuestro-force-graph-labels"
              :x="n.x + getNodeRadius(n) + 2"
              :y="n.y"
              text-anchor="start"
              alignment-baseline="central">
          {{ n.name }}
        </text>
      </g>
    </svg>
    <div v-if="!$root.mobile" class="vuestro-chart-toolbar">
      <vuestro-button round size="sm" @click="decreaseDistance" :disabled="(distance + distanceOffset) <= 0" value>
        <vuestro-icon name="minus"></vuestro-icon>
      </vuestro-button>
      <vuestro-pill size="sm" color="var(--vuestro-secondary)" clickable @click="resetLinkThreshold">
        <template #title>&nbsp;{{ distance + distanceOffset }}&nbsp;</template>
      </vuestro-pill>
      <vuestro-button round size="sm" @click="increaseDistance" value>
        <vuestro-icon name="plus"></vuestro-icon>
      </vuestro-button>
      <slot></slot>
      <vuestro-button pill size="sm" @click="onReset">Reset</vuestro-button>
      <vuestro-button pill size="sm" v-model="labels">Labels</vuestro-button>
    </div>
  </div>
</template>

<script>

/* global _ */
import * as d3 from 'd3';
import './VuestroChartStyle';

export default {
  name: 'VuestroForceGraph',
  props: {
    data: { type: Object, default: () => ({}) },
    options: { type: Object, default: () => ({}) },
  },
  data() {
    return {
      width: 0,
      height: 0,
      nodes: _.cloneDeep(this.data.nodes),
      links: _.cloneDeep(this.data.links),
      nodeRadius: 5,
      dragNode: null,
      selectedNode: null,
      colorScale: d3.scaleOrdinal(d3.schemeCategory10),
      labels: false,
      graph: null,
      distance: 20,
      distanceOffset: 0,
    };
  },
  watch: {
    data: {
      handler(newVal) {
        _.merge(this.nodes, newVal.nodes);
        _.merge(this.links, newVal.links);
        this.graph.nodes(this.nodes)
        .force('link', d3.forceLink(this.links).distance([this.distance]))
        .alpha(1).restart();
        this.resize();
      },
      deep: true,
    },
  },
  beforeMount() {
    _.merge(this, this.options);
    // initialize empty
    this.graph = this.forceGraph([], []);
  },
  mounted() {
    window.addEventListener('resize', this.resize);
    this.resize();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize);
  },
  methods: {
    forceGraph(nodes, links) {
      return d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).distance([this.distance + this.distanceOffset]))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(this.width / 2, this.height / 2))
      .force('collide', d3.forceCollide(this.nodeRadius*2));
    },
    resize() {
      this.$nextTick(() => {
        if (this.nodes && this.nodes.length > 0 && this.$el.clientWidth > 0 && this.$el.clientHeight > 0) {
          this.$nextTick(() => {
            this.width = this.$el.clientWidth;
            this.height = this.$el.clientHeight;
            this.graph = this.forceGraph(this.nodes, this.links);
            this.graph.on("tick", (d) => {
              this.$forceUpdate();
            });
          });
        }
      });
    },
    onSelectNode(n) {
      this.dragNode = n;
      this.selectedNode = n;
      this.$emit('select', this.data.nodes[n.index], n.index);
    },
    onDrag(e) {
      if (this.dragNode) {
        // set node fixed positions
        this.dragNode.fx = e.offsetX;
        this.dragNode.fy = e.offsetY;
      }
    },
    onDrop(){
      // only restart if position was changed
      if (this.dragNode && this.dragNode.fx && this.dragNode.fy) {
        this.graph.alpha(1);
        this.graph.restart();
      }
      this.dragNode = null;
    },
    getNodeColor(n) {
      if (this.selectedNode === n) {
        return 'var(--vuestro-gold)';
      }
      return this.colorScale(n.name);
    },
    getNodeRadius(n) {
      if (this.selectedNode === n) {
        return this.nodeRadius*2;
      }
      return this.nodeRadius;
    },
    onReset() {
      this.distanceOffset = 0;
      this.selectedNode = null;
      this.dragNode = null;
      this.nodes.map((n) => {
        delete n.fx;
        delete n.fy;
      });
      this.resize();
    },
    increaseDistance() {
      this.distanceOffset += 10;
      this.resize();
    },
    decreaseDistance() {
      this.distanceOffset -= 10;
      this.resize();
    },
    resetLinkThreshold() {
      this.distanceOffset = 0;
      this.resize();
    },
  },
};

</script>

<style scoped>

.vuestro-force-graph {
  position: relative;
  width: 100%;
  height: 100%;
  flex-grow: 1;
  overflow: hidden;
}

.vuestro-force-graph > svg {
  position: relative;
}

.vuestro-force-graph-labels {
  pointer-events: none;
  fill: var(--vuestro-text-color);
}

</style>
