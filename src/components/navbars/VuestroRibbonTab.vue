<template>
  <div v-if="isShown" class="vuestro-ribbon-tab"
       :class="{ 'vuestro-ribbon-tab-active': isParentRoute || route.name === selectedRoute.name }"
       :style="{ '--vuestro-ribbon-tab-active-bg': route.meta.color || 'var(--vuestro-selection)' }"
       @click="onClick">
    <vuestro-icon :name="route.meta.icon"></vuestro-icon>
    {{ route.meta.title }}
  </div>
</template>

<script>

export default {
  name: 'VuestroRibbonTab',
  props: {
    route: { type: Object, required: true },
    selectedRoute: { type: Object, required: true },
  },
  computed: {
    basePath() {
      return this.route.path.split('/:')[0]; // remove any params
    },
    isParentRoute() {
      return this.$route.fullPath.startsWith(this.basePath);
    },
    isShown() {
      return this.route.meta && this.route.meta.sidebar && this.route.meta.title;
    },
  },
  methods: {
    onClick() {
      this.$emit('click', this.route);
    },
  },
};

</script>

<style scoped>

.vuestro-ribbon-tab {
  --vuestro-ribbon-tab-radius: 0.7em;
  height: calc(100% - 0.3em);
  margin: 0 1px;
  padding: 0.7em;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-top-left-radius: var(--vuestro-ribbon-tab-radius);
  border-top-right-radius: var(--vuestro-ribbon-tab-radius);
}
.vuestro-ribbon-tab > .vuestro-icon {
  margin-right: 0.5em;
}

.vuestro-ribbon-tab:hover {
  background-color: var(--vuestro-selection);
}

.vuestro-ribbon-tab.vuestro-ribbon-tab-active {
  background-color: var(--vuestro-ribbon-tab-active-bg)
}

</style>