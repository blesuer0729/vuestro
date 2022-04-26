<template>
  <div class="vuestro-sidebar-menu" @click.self="$emit('click')">
    <vuestro-sidebar-item v-for="(route, ridx) in routes" :key="route.name"
                          v-if="isShown(role, route)"
                          :role="role"
                          :route="route">
    </vuestro-sidebar-item>
  </div>
</template>

<script>

import VuestroSidebarMixins from './VuestroSidebarMixins';

export default {
  name: 'VuestroSidebarMenu',
  mixins: [
    VuestroSidebarMixins,
  ],
  props: {
    role: { type: [String, Array], default: () => [] }, // user role
    routes: { type: Array, required: true },
  },
};

</script>

<style scoped>

.vuestro-sidebar-menu {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding-right: var(--vuestro-sidebar-item-padding-right);
  overflow-x: visible;
  overflow-y: auto;
}

.vuestro-app.mobile .vuestro-sidebar-menu .vuestro-sidebar {
  overflow-y: auto;
}

</style>