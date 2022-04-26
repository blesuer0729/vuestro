//
// CSS Vars:
//  --vuestro-sidebar-header-logo-padding
//
<template>
  <div class="vuestro-sidebar-header">

    <!--LOGO-->
    <div v-if="$slots.logo" class="vuestro-sidebar-logo">
      <!--<div class="vuestro-sidebar-logo-inner">-->
        <slot name="logo"></slot>
      <!--</div>-->
    </div>

    <!--TITLE BLOCK-->
    <div v-if="$slots.title" class="vuestro-sidebar-header-title">
      <slot name="title"></slot>
    </div>

  </div>
</template>

<script>

export default {
  name: 'VuestroSidebarHeader',
  props: {
  },
  computed: {
    showTitle() {

    },
  },
};

</script>

<style scoped>

.vuestro-sidebar-header {
  background-color: var(--vuestro-sidebar-header-bg, var(--vuestro-content-bg));
  color: var(--vuestro-sidebar-header-fg, var(--vuestro-text-color));
  display: flex;
  flex-direction: column;
}

.vuestro-sidebar-header-title {
  background-color: var(--vuestro-sidebar-header-bg);
  color: var(--vuestro-sidebar-header-fg);
  text-align: var(--vuestro-sidebar-header-title-align, center);
  font-size: var(--vuestro-sidebar-header-title-font-size, 2em);
  padding: var(--vuestro-sidebar-header-title-padding, 5px 0);
  transition: opacity 0.4s;
}
.vuestro-mini-sidebar .vuestro-sidebar-header-title {
  opacity: 0;
}

.vuestro-sidebar-logo {
  transition: all 0.4s;
  display: flex;
  flex: none;
  flex-wrap: wrap;
  width: var(--vuestro-sidebar-normal-width);
  padding: var(--vuestro-sidebar-header-logo-padding, 0);
}
.vuestro-sidebar-logo >>> img {
  width: 100%;
  height: auto;
}

.vuestro-mini-sidebar .vuestro-sidebar-logo {
  padding-bottom: 15px;
}



</style>