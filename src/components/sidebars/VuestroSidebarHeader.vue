<template>
  <div class="vuestro-sidebar-header">
    <div v-if="$scopedSlots.toolbar" class="vuestro-sidebar-toolbar">
      <slot name="toolbar">
      </slot>
    </div>

    <!--LOGO-->
    <div v-if="$scopedSlots.logo" class="vuestro-sidebar-logo">
      <slot name="logo"></slot>
    </div>

  </div>
</template>

<script>

export default {
  name: 'VuestroSidebarHeader',
};

</script>

<style scoped>

.vuestro-sidebar-header {
  background-color: var(--vuestro-sidebar-header-bg, var(--vuestro-content-bg));
  color: var(--vuestro-sidebar-header-fg, var(--vuestro-text-color));
}



</style>