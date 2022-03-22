<template>
  <div class="vuestro-ribbon"
       :style="style">
    <transition name="vuestro-ribbon-contents" mode="out-in">
      <vuestro-container class="vuestro-ribbon-contents" v-if="open" gutter="sm" no-wrap>
        <!--CHILD/SUB ROUTES-->
        <div class="vuestro-ribbon-sub-routes">
          <div v-for="c in childRoutes" :key="c.name"
               v-if="c.meta.sidebar"
               class="vuestro-ribbon-sub-route"
               :class="{ 'active': isCurrentChildRoute(c) }"
               @click="onClickSubRoute(c)">
            <div class="vuestro-sub-route-icon">
              <vuestro-icon v-if="c.meta.icon" :name="c.meta.icon"></vuestro-icon>
              <vuestro-icon v-else :name="fallbackIcon"></vuestro-icon>
            </div>
            <vuestro-pill size="md"
                          :color="c.meta.color || 'transparent'"
                          no-margin>
              <template #title>{{ c.meta.title }}</template>
            </vuestro-pill>
          </div>
        </div>
        <!--USER-DEFINED 'RIBBON' COMPONENT-->
        <template v-if="route.meta.ribbon">
          <div class="vuestro-ribbon-v-separator"></div>
          <div class="vuestro-ribbon-user-component">
            <component :is="route.meta.ribbon"></component>
          </div>
        </template>
      </vuestro-container>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'VuestroRibbon',
  props: {
    open: { type: Boolean, required: true },
    route: { type: Object, required: true },
    fallbackIcon: { type: String, default: 'cubes' },
  },
  data() {
    return {
      routes: this.$router.options.routes,
    };
  },
  computed: {
    currentColor() {
      return this.route &&
             this.route.meta &&
             this.route.meta.color;
    },
    childRoutes() {
      return this.route.children || [];
    },
    style() {
      let color = this.currentColor || 'var(--vuestro-selection)';
      if (this.open) {
        return {
          height: 'var(--vuestro-ribbon-height)',
          'background-color': color,
        };
      }
      return {
        height: 0,
        border: `1px solid ${color}`,
      };
    }
  },
  methods: {
    onClickSubRoute(c) {
      this.$router.push({ name: c.name });
    },
    isCurrentChildRoute(c) {
      if (this.$route.matched.length > 1) {
        return this.$route.matched[1].name === c.name;
      }
      return false;
    },

  },
};

</script>

<style scoped>

.vuestro-ribbon {
  display: flex;
  transition: height 0.2s;
}

.vuestro-ribbon-contents {
  opacity: 1;
}
/* transition for contents */
.vuestro-ribbon-contents-enter-active, .vuestro-ribbon-contents-leave-active {
  transition: opacity 0.2s;
  overflow: hidden;
}
.vuestro-ribbon-contents-enter, .vuestro-ribbon-contents-leave-to {
  opacity: 0;
}

.vuestro-ribbon-sub-routes {
  display: flex;
  height: 100%;
  align-items: stretch;
}

.vuestro-ribbon-sub-route {
  cursor: pointer;
  border-radius: var(--vuestro-control-border-radius);
  padding: 0.2em;
  border: 1px solid transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.vuestro-ribbon-sub-route:hover {
  background-color: rgba(255,255,255,0.2);
}
.vuestro-ribbon-sub-route.active {
  background-color: rgba(255,255,255,0.2);
  border-color: rgba(255,255,255,0.4);
}
.vuestro-ribbon-sub-route >>> svg {
  width: calc(var(--vuestro-ribbon-height) / 3);
  height: calc(var(--vuestro-ribbon-height) / 3);
  margin-top: 0.1em;
  margin-bottom: 0.3em;
}

.vuestro-ribbon-v-separator {
  height: 100%;
  padding: 0.2em;
  display: flex;
}
.vuestro-ribbon-v-separator:after {
  content: "";
  border-right: 1px solid rgba(255,255,255,0.4);
}

.vuestro-ribbon-user-component {
  overflow: auto;
}

</style>