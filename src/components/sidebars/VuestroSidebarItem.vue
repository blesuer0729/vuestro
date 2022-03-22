<template>
  <div class="vuestro-sidebar-item"
       :class="{ bottom: route.meta.sidebarBottom }">
    <!--CHILDREN-->
    <template v-if="route.children">
      <a :class="{ 'vuestro-router-link-active': isParentRoute }"
         :style="{ 'background-color': route.meta.bgColor, '--vuestro-sidebar-fg': route.meta.fgColor }"
         @click="toggle">
        <vuestro-icon v-if="route.meta.icon" :name="route.meta.icon"></vuestro-icon>
        <span v-if="route.meta.svg" v-html="route.meta.svg"></span>
        <div class="vuestro-sidebar-item-title">
          <span>{{ route.meta.title }}</span>
          <template v-if="route.meta.badgeComponent">
            <component :is="route.meta.badgeComponent"></component>
          </template>
        </div>
      </a>
      <vuestro-sub-routes :show="active" :role="role" :route="route"></vuestro-sub-routes>
    </template>
    <!--NO CHILDREN-->
    <router-link v-else
                 :to="route"
                 active-class="vuestro-router-link-active"
                 exact-active-class="vuestro-router-link-exact-active"
                 :style="{ 'background-color': route.meta.bgColor, '--vuestro-sidebar-fg': route.meta.fgColor }">
      <vuestro-icon v-if="route.meta.icon" :name="route.meta.icon"></vuestro-icon>
      <span v-if="route.meta.svg" v-html="route.meta.svg"></span>
      <div class="vuestro-sidebar-item-title">
        <span>{{ route.meta.title }}</span>
        <template v-if="route.meta.badgeComponent">
          <component :is="route.meta.badgeComponent"></component>
        </template>
      </div>
    </router-link>
    <!--VUEX CHILDREN-->
    <template v-if="route.meta.vuex">
      <vuestro-sub-routes :route="vuexRoute" to-path></vuestro-sub-routes>
    </template>
  </div>
</template>

<script>

import VuestroSubRoutes from './VuestroSubRoutes.vue';

export default {
  name: 'VuestroSidebarItem',
  components: {
    VuestroSubRoutes,
  },
  props: {
    role: { type: [String, Array], default: () => [] }, // user role
    route: { type: Object, required: true },
  },
  data() {
    return {
      active: false,
    };
  },
  beforeMount() {
    this.active = this.isParentRoute;
  },
  computed: {
    basePath() {
      return this.route.path.split('/:')[0]; // remove any params
    },
    isParentRoute() {
      return this.$route.fullPath.startsWith(this.basePath);
    },
    vuexRoute() {
      return {
        path: this.basePath,
        children: this.$store.getters[this.route.meta.vuex],
      };
    },
  },
  methods: {
    toggle() {
      this.active = !this.active;
    },
  }
};

</script>

<style scoped>

.vuestro-sidebar-item {
  position: relative;
}

.vuestro-sidebar-item.bottom {
  margin-top: auto;
}

.vuestro-sidebar-item > a {
  min-height: var(--vuestro-sidebar-item-height);
  display: flex;
  padding-left: 5px;
  align-items: center;
  color: var(--vuestro-sidebar-fg) !important; /* override gloabl <a> color */
  font-size: var(--vuestro-sidebar-item-font-size);
  text-decoration: none;
  cursor: pointer;
  white-space: nowrap;
  border-top-right-radius: var(--vuestro-sidebar-radius);
  border-bottom-right-radius: var(--vuestro-sidebar-radius);
  transition: all 0.4s;
}

.vuestro-sidebar-item > a:hover,
.vuestro-sidebar-item > a.vuestro-router-link-active,
.vuestro-sidebar-item > a.vuestro-router-link-active:hover {
  background-color: var(--vuestro-sidebar-item-hover);
  border-left: var(--vuestro-sidebar-active-border);
}
.vuestro-sidebar-item > a.vuestro-router-link-exact-active {
  background-color: var(--vuestro-sidebar-item-active-bg);
  color: var(--vuestro-sidebar-item-active-fg);
}

.vuestro-sidebar-item a > .vuestro-icon {
  padding-left: 0.7em;
  padding-right: 0.7em;
}

.vuestro-sidebar-item-title {
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

</style>