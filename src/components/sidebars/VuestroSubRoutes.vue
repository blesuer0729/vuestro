<template>
  <transition name="vuestro-sub-routes" mode="out-in">
    <ul v-if="show" class="vuestro-sub-routes">
      <template v-for="subroute in route.children">
        <li v-if="isShown(role, subroute)"
            class="vuestro-sub-routes-item"
            :key="subroute.path">
          <router-link v-if="toPath"
                       :to="{ path: route.path + '/' + subroute.path }"
                       exact-active-class="vuestro-router-link-exact-active"
                       active-class="vuestro-router-link-active">
            {{ subroute.meta.title }}
          </router-link>
          <router-link v-else
                       :to="subroute"
                       exact-active-class="vuestro-router-link-exact-active"
                       active-class="vuestro-router-link-active">
            {{ subroute.meta.title }}
          </router-link>
        </li>
      </template>
    </ul>
  </transition>
</template>

<script>

import VuestroSidebarMixins from './VuestroSidebarMixins';

export default {
  name: 'VuestroSubRoutes',
  mixins: [
    VuestroSidebarMixins,
  ],
  props: {
    role: { type: [String, Array], default: () => [] }, // user role
    route: { type: Object, required: true },
    show: { type: Boolean, default: true },
    toPath: { type: Boolean, default: false }, // build a path manually
  },
};

</script>

<style scoped>

.vuestro-sub-routes {
  list-style-type: none;
  padding-left: 0;
  margin: var(--vuestro-sidebar-subroutes-spacing) 0;
  transition: all 0.2s;
}

/* all sub-menu item styling */
.vuestro-sub-routes-item > a {
  display: flex;
  height: var(--vuestro-sidebar-subroutes-item-height);
  line-height: var(--vuestro-sidebar-subroutes-item-height);
  align-items: center;
  padding-left: var(--vuestro-sidebar-subroutes-padding-left);
  text-decoration: none;
  white-space: nowrap;
  font-size: var(--vuestro-sidebar-sub-item-font-size);
  display: block;
  transition: all 0.4s;
  color: var(--vuestro-sidebar-fg) !important; /* override gloabl <a> color */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-top-right-radius: var(--vuestro-sidebar-radius);
  border-bottom-right-radius: var(--vuestro-sidebar-radius);
}

/* highlight for sub-menu hover */
.vuestro-sub-routes-item > a:hover {
  background-color: var(--vuestro-sidebar-item-hover);
  filter: brightness(102%);
}
.vuestro-sub-routes-item > a.vuestro-router-link-active {
  background-color: var(--vuestro-sidebar-item-active-bg);
  color: var(--vuestro-sidebar-subroute-active-fg);
  border-left: var(--vuestro-sidebar-subroute-active-border);
}

.vuestro-sub-routes-enter-active, .vuestro-sub-routes-leave-active {
  transition: all 0.4s;
}
.vuestro-sub-routes-enter, .vuestro-sub-routes-leave-to {
  opacity: 0;
  transform: translateX(-30%);
}

</style>