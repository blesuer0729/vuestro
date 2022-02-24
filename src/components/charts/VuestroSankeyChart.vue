<template>
  <div class="vuestro-sankey-chart">
    <svg :width="width"
         :height="height"
         :style="{ transform: `translate(${margin.left}px, ${margin.top}px)` }">
      <defs>
        <linearGradient v-for="l in graph.links"
                        :id="`gradient_${l.index}`"
                        :key="l.index"
                        gradientUnits="userSpaceOnUse"
                        :x1="l.source.x"
                        :y1="l.source.y"
                        :x2="l.target.x"
                        :y2="l.target.y">
          <stop offset="0%" :stop-color="color(l.source.name)"></stop>
          <stop offset="100%" :stop-color="color(l.target.name)"></stop>
        </linearGradient>
      </defs>
      <g>
        <g>
          <rect class="vuestro-sankey-node"
                v-for="(n, idx) in graph.nodes"
                :class="{ focused: n.name === focusedNode.name }"
                :x="n.x0"
                :y="n.y0"
                :key="n.name"
                :height="n.y1 - n.y0"
                :width="n.x1 - n.x0"
                :fill="color(n.name)"
                :fill-opacity="nodeOpacity"
                :stroke="color(n.name)"
                @click="focusNode(n)">
          </rect>
        </g>
        <g fill="none" stroke-opacity="0.5">

          <path v-for="l in graph.links"
                :d="sankeyLink(l)"
                :key="l.index"
                :stroke="`url(#gradient_${l.index})`"
                :stroke-width="l.width"
                class="sankey-link">
            <title>
              <text>{{ renderValue(l.value) }}</text>
            </title>
          </path>
        </g>
        <g>
          <text v-for="n in graph.nodes"
                v-if="n.x0 !== undefined && n.x1 !== undefined"
                class="vuestro-sankey-text"
                :x="n.x0 < width / 2 ? n.x1 + 6 : n.x0 - 6"
                :key="n.name"
                :y="(n.y1 + n.y0) / 2 + 1"
                :text-anchor="n.x0 < width / 2 ? 'start' : 'end'"
                alignment-baseline="middle">
            {{ n.name }}
          </text>
        </g>
      </g>
    </svg>
    <div v-if="!$root.mobile" class="sankey-toolbar" :style="{ height: `${toolbarHeight}px` }">
      <vuestro-button round size="sm" @click="decreaseLinkThreshold" value>
        <vuestro-icon name="minus"></vuestro-icon>
      </vuestro-button>
      <vuestro-pill color="var(--vuestro-secondary)" clickable @click="resetLinkThreshold">
        <template #title>{{ maxLinks }} links</template>
      </vuestro-pill>
      <vuestro-button round size="sm" @click="increaseLinkThreshold" value>
        <vuestro-icon name="plus"></vuestro-icon>
      </vuestro-button>
      <vuestro-button pill size="sm" @click="cycleNodeAlign">
        <template v-if="nodeAlign === nodeAlignOptions.justify"><vuestro-icon name="align-justify"></vuestro-icon></template>
        <template v-if="nodeAlign === nodeAlignOptions.center"><vuestro-icon name="align-center"></vuestro-icon></template>
        <template v-if="nodeAlign === nodeAlignOptions.left"><vuestro-icon name="align-left"></vuestro-icon></template>
        <template v-if="nodeAlign === nodeAlignOptions.right"><vuestro-icon name="align-right"></vuestro-icon></template>
      </vuestro-button>
      <vuestro-pill color="var(--vuestro-gold)">
        <template #title>
          <span class="sankey-toolbar-selected-node-title">{{ selectedNodeLabel }}</span>
        </template>
        <template #value>
          <div class="sankey-toolbar-selected-node-value">
            {{ focusedNode.name }}
          </div>
        </template>
        <template #value-buttons>
          <slot :node="focusedNode"></slot>
        </template>
      </vuestro-pill>
    </div>
  </div>
</template>

<script>

/* global _ */
import * as d3 from 'd3';
import * as Sankey from 'd3-sankey';

export default {
  name: 'VuestroSankeyChart',
  props: {
    data: { type: Object, default: () => ({}) },
    options: { type: Object, default: () => ({}) },
  },
  data() {
    return {
      toolbarHeight: 32,
      prunedData: {},
      width: 0,
      height: 0,
      nodeWidth: 10,
      nodePadding: 5,
      nodeOpacity: 0.7,
      graph: {},
      margin: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
      },
      maxLinks: this.data.links.length,
      renderValue: (d) => {
        return d;
      },
      focusedNode: null,                    // name of focused node
      selectedNodeLabel: 'Selected Node',
      nodeAlign: Sankey.sankeyJustify,
      nodeAlignOptions: {
        justify: Sankey.sankeyJustify,
        center: Sankey.sankeyCenter,
        left: Sankey.sankeyLeft,
        right: Sankey.sankeyRight,
      }
    };
  },
  computed: {
    color() {
      return d3.scaleOrdinal(d3.schemeCategory10);
    },
    sankey() {
      return Sankey.sankey()
        .nodeAlign(this.nodeAlign)
        .nodeWidth(this.nodeWidth)
        .nodePadding(this.nodePadding)
        .extent([[this.nodePadding/2, this.nodePadding/2], [this.width - this.nodePadding/2, this.height - this.nodePadding/2]]);
    },
    sankeyLink() {
      return Sankey.sankeyLinkHorizontal();
    },
  },
  watch: {
    data(newVal) {
      this.processData();
    },
  },
  beforeMount() {
    _.merge(this, this.options);
  },
  mounted() {
    window.addEventListener('resize', this.resize);
    this.processData();
    this.resize();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize);
  },
  methods: {
    processData() {
      // see if a node was marked as focused
      if (!this.focusedNode) {
        this.focusedNode = _.find(this.data.nodes, 'focus');
      }
      if (this.data.links && this.data.links.length <= this.maxLinks) {
        // take all the data
        this.prunedData = _.cloneDeep(this.data);
      } else {
        this.prunedData = {
          nodes: [],
          links: [],
        };
        let keptLinks = [];
        if (!this.focusedNode) {
          // no focused node, just take the top N links by value
          keptLinks = _.take(_.orderBy(this.data.links, 'value', ['desc']), this.maxLinks);
        } else {
          let fidx = _.findIndex(this.data.nodes, { name: this.focusedNode.name });
          // node was focused, take that node and top N links in and out of it
          keptLinks = _.take(_.orderBy(_.filter(this.data.links, (d) => {
            return d.source === fidx || d.target === fidx;
          }), 'value', ['desc']), this.maxLinks);
        }
        for (let l of keptLinks) {
          let srcIdx = _.findIndex(this.prunedData.nodes, this.data.nodes[l.source]);
          if (srcIdx < 0) {
            srcIdx = this.prunedData.nodes.length;
            this.prunedData.nodes.push(this.data.nodes[l.source]);
          }
          let tgtIdx = _.findIndex(this.prunedData.nodes, this.data.nodes[l.target]);
          if (tgtIdx < 0) {
            tgtIdx = this.prunedData.nodes.length;
            this.prunedData.nodes.push(this.data.nodes[l.target]);
          }
          this.prunedData.links.push({
            source: srcIdx,
            target: tgtIdx,
            value: l.value,
          });
        }
      }
    },
    resize() {
      this.$nextTick(() => {
        if (this.$el.clientWidth > 0 && this.$el.clientHeight > 0) {
          this.width = this.$el.clientWidth - this.margin.left - this.margin.right;
          this.height = this.$el.clientHeight - this.margin.top - this.margin.bottom - this.toolbarHeight;
          if (this.prunedData.nodes && this.prunedData.links && this.prunedData.nodes.length > 0 && this.prunedData.links.length > 0) {
              this.graph = this.sankey(this.prunedData);
          }
        }
      });
    },
    increaseLinkThreshold() {
      this.maxLinks += 5;
      if (this.maxLinks > this.data.links.length) {
        this.maxLinks = this.data.links.length;
      }
      this.processData();
      this.resize();
    },
    decreaseLinkThreshold() {
      this.maxLinks -= 5;
      if (this.maxLinks < 0) {
        this.maxLinks = 0;
      }
      this.processData();
      this.resize();
    },
    resetLinkThreshold() {
      this.maxLinks = this.data.links.length;
      this.processData();
      this.resize();
    },
    focusNode(n) {
      this.focusedNode = n;
      this.processData();
      this.resize();
    },
    cycleNodeAlign() {
      switch (this.nodeAlign) {
        case this.nodeAlignOptions.justify:
          this.nodeAlign = this.nodeAlignOptions.center;
          break;
        case this.nodeAlignOptions.center:
          this.nodeAlign = this.nodeAlignOptions.left;
          break;
        case this.nodeAlignOptions.left:
          this.nodeAlign = this.nodeAlignOptions.right;
          break;
        case this.nodeAlignOptions.right:
          this.nodeAlign = this.nodeAlignOptions.justify;
          break;
      }
      this.resize();
    },
  },
};

</script>

<style scoped>

.vuestro-sankey-chart {
  position: relative;
  width: 100%;
  height: 100%;
  flex-grow: 1;
  overflow: hidden;
}

.sankey-link {
  stroke-opacity: 0.4
}

.sankey-link:hover {
  stroke-opacity: 0.8
}

.vuestro-sankey-node {
  cursor: pointer;
}

.vuestro-sankey-node.focused {
  fill: var(--vuestro-gold);
  stroke: var(--vuestro-gold);
}

.sankey-toolbar {
  width: 100%;
  padding: 2px;
  position: absolute;
  bottom: 0;
  display: flex;
}

.sankey-toolbar-selected-node-title {
  font-weight: 300;
}

.sankey-toolbar-selected-node-value {
  height: 100%;
  font-weight: 500;
  display: flex;
  align-items: center;
}
.vuestro-sankey-text {
  fill: var(--vuestro-text-color);
}

</style>