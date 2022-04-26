// the parent sidebar component
//
//
// CSS Vars:
//  --vuestro-sidebar-normal-width - width of 'normal' size sidebar
//  --vuestro-sidebar-mini-width - width of 'mini' (icons-only) sidebar
//  --vuestro-sidebar-bg - sidebar bg
//  --vuestro-sidebar-fg - sidebar fg
//  --vuestro-sidebar-border - right border (between sidebar and content)
//  --vuestro-sidebar-item-height - height of each sidebar item
//  --vuestro-sidebar-item-padding-right - right inner padding for each item
//  --vuestro-sidebar-item-hover - item hover color
//  --vuestro-sidebar-item-active-bg - bg color for active items
//  --vuestro-sidebar-item-active-fg - fg color for active
//  --vuestro-sidebar-radius - item right side radius
//  --vuestro-sidebar-subroutes-spacing - spacing between subroutes
//  --vuestro-sidebar-active-border - left border for active item (usually colorful)
//  --vuestro-sidebar-subroute-active-fg - text color for active sub-items
//  --vuestro-sidebar-subroute-active-border - left border for active sub-items (usually contrasting color)
//  --vuestro-sidebar-font-weight: 400;
//  --vuestro-sidebar-item-font-size: 16px;
//  --vuestro-sidebar-sub-item-font-size: 15px;
//  --vuestro-sidebar-subroutes-padding-left: 40px;
//  --vuestro-sidebar-subroutes-item-height: 30px;
//  --vuestro-sidebar-z-index
//
<template>
  <div class="vuestro-sidebar">
    <!--TOOLBAR-->
    <div v-if="$slots.toolbar" class="vuestro-sidebar-toolbar-slot">
      <slot name="toolbar"></slot>
    </div>

    <!--HEADER SLOT-->
    <div v-if="$slots.header" class="vuestro-sidebar-header-slot">
      <slot name="header"></slot>
    </div>

    <!--MENU-->
    <transition name="vuestro-sidebar" mode="out-in" @after-leave="afterLeave">
      <vuestro-sidebar-menu v-if="!mini"
                            :routes="routes"
                            :role="role"
                            @click="toggleSidebar">
      </vuestro-sidebar-menu>
      <vuestro-mini-sidebar-menu v-else
                                 :routes="routes"
                                 :role="role"
                                 @click="toggleSidebar">
      </vuestro-mini-sidebar-menu>
    </transition>

    <!--FOOTER SLOT-->
    <div v-if="$slots.footer" class="vuestro-sidebar-footer-slot">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>

/* global _, window, Event */

export default {
  name: 'VuestroSidebar',
  props: {
    mini: { type: Boolean, default: false }, // mini sidebar
    role: { type: [String, Array], default: () => [] }, // user role
    routes: {
      type: Array,
      default: function() {
        return _.cloneDeep(this.$router.options.routes);
      }
    },
  },
  data() {
    return {
      geoColor: '', // the geopattern base color
    };
  },
  beforeMount() {
    this.checkSidebar();
  },
  watch: {
    mini(newVal) {
      this.checkSidebar();
    },
  },
  methods: {
    toggleSidebar() {
      this.$emit('update:mini', !this.mini);
      this.checkSidebar();
    },
    checkSidebar() {
      if (this.mini) {
        document.body.classList.add('vuestro-mini-sidebar');
      } else {
        document.body.classList.remove('vuestro-mini-sidebar');
      }
    },
    afterLeave() {
      this.$nextTick(() => {
        this.$nextTick(() => {
          window.dispatchEvent(new Event('resize'));
          setTimeout(() => {
            this.debounceAuto = false;
          }, 1000);
        });
      });
    },
  },
};
</script>

<style>
.vuestro-app {
  --vuestro-sidebar-normal-width: 180px;
  --vuestro-sidebar-mini-width: 70px;
  --vuestro-sidebar-bg: var(--vuestro-content-bg);
  --vuestro-sidebar-fg: var(--vuestro-text-color);
  --vuestro-sidebar-item-height: 45px;
  --vuestro-sidebar-item-padding-right: 15px;
  --vuestro-sidebar-item-hover: var(--vuestro-hover);
  --vuestro-sidebar-item-active-bg: var(--vuestro-active);
  --vuestro-sidebar-item-active-fg: #278ffd;
  --vuestro-sidebar-radius: calc(var(--vuestro-sidebar-item-height) / 2);
  --vuestro-sidebar-subroutes-spacing: 2px;
  --vuestro-sidebar-active-border: 3px solid #278ffd;
  --vuestro-sidebar-subroute-active-fg: var(--vuestro-orange);
  --vuestro-sidebar-subroute-active-border: 3px solid var(--vuestro-orange);
  --vuestro-sidebar-font-weight: 400;
  --vuestro-sidebar-item-font-size: 16px;
  --vuestro-sidebar-sub-item-font-size: 15px;
  --vuestro-sidebar-subroutes-padding-left: 40px;
  --vuestro-sidebar-subroutes-item-height: 30px;
}
.vuestro-app.mobile {
  --vuestro-sidebar-normal-width: 400px;
  --vuestro-sidebar-item-height: 100px;
  --vuestro-sidebar-item-font-size: 1.2em;
  --vuestro-sidebar-sub-item-font-size: 1.2em;
  --vuestro-sidebar-subroutes-spacing: 6px;
  --vuestro-sidebar-subroutes-padding-left: 55px;
  --vuestro-sidebar-subroutes-item-height: 80px;
}
</style>

<style scoped>

.vuestro-sidebar {
  color: var(--vuestro-sidebar-fg);
  background: var(--vuestro-sidebar-bg);
  border-right: var(--vuestro-sidebar-border, none);
  max-width: var(--vuestro-sidebar-normal-width);
  width: var(--vuestro-sidebar-normal-width);
  transition: all 0.4s;
  flex: none;
  display: flex;
  flex-direction: column;
  font-weight: var(--vuestro-sidebar-font-weight);
  position: relative;
  z-index: var(--vuestro-sidebar-z-index, 101);
}

/* .vuestro-mini-sidebar class is added to body */
.vuestro-mini-sidebar .vuestro-sidebar {
  max-width: var(--vuestro-sidebar-mini-width);
  width: var(--vuestro-sidebar-mini-width);
}


.vuestro-sidebar-toolbar-slot {
  display: flex;
  justify-content: space-between;
  padding: 0.2em;
}

/* put footer all the way down */
.vuestro-sidebar-footer-slot {
  margin-top: auto;
}

/* transitions */
.vuestro-sidebar-enter-active, .vuestro-sidebar-leave-active {
  transition: opacity 0.4s;
}
.vuestro-sidebar-enter, .vuestro-sidebar-leave-to {
  opacity: 0;
}

</style>