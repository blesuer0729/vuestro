<template>
  <div class="vuestro-mini-sidebar-menu" @click.self="$emit('click')">
    <vuestro-mini-sidebar-item v-for="(route, ridx) in routes"
                        :key="route.path"
                        v-if="isShown(role, route)"
                        :role="role"
                        :route="route">
    </vuestro-mini-sidebar-item>
  </div>
</template>

<script>

import VuestroMiniSidebarItem from './VuestroMiniSidebarItem.vue';
import VuestroSidebarMixins from './VuestroSidebarMixins';

export default {
  name: 'VuestroMiniSidebarMenu',
  components: {
    VuestroMiniSidebarItem,
  },
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

.vuestro-mini-sidebar-menu {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  padding-right: var(--vuestro-sidebar-item-padding-right);
}

</style>

