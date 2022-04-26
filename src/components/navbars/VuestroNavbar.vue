// A Navbar container, provides a few built-in features, but mostly relies on the user
// to fill-in the slots
//
// SLOTS:
//  :logo - the typical logo location
//  :logo-separator - in between the logo and default slot
//  :default - the default slot, stretched to fill
//  :buttons-separator - in between the default slot and buttons slot
//  :buttons - always in the far right of the navbar
//
<template>
  <div class="vuestro-navbar" :class="[ gutter ]">
    <div class="vuestro-navbar-navbar">
      <!--MOBILE SIDEBAR BUTTON-->
      <template v-if="variant === 'mobile' && $root.mobile">
          <vuestro-button class="vuestro-hamburger"
                          no-border rounded
                          size="xl"
                          :value="showSidebar"
                          @click="showSidebar = !showSidebar">
            <vuestro-icon name="bars"></vuestro-icon>
          </vuestro-button>
          <transition name="vuestro-mobile-frost" mode="out-in">
            <div v-if="showSidebar" class="vuestro-mobile-frosted" @click="showSidebar = false"></div>
          </transition>
          <transition name="vuestro-mobile-sidebar" mode="out-in">
            <div v-if="showSidebar" class="vuestro-mobile-sidebar-wrapper">
              <slot name="mobile-sidebar"></slot>
            </div>
          </transition>
        </vuestro-dropdown>
      </template>
      <div class="vuestro-navbar-gutter"></div>
      <!--LOGO SLOT-->
      <div v-if="$slots.logo" class="vuestro-navbar-logo">
        <slot name="logo" ></slot>
      </div>
      <div class="vuestro-navbar-gutter"></div>
      <slot name="logo-separator"></slot>
      <div class="vuestro-navbar-gutter"></div>
      <!--RIBBON TABS-->
      <div v-if="variant === 'ribbon' && routes" class="vuestro-navbar-ribbon-tabs">
        <vuestro-ribbon-tab v-for="route in routes" :key="route.path"
                            :route="route"
                            :selectedRoute="selectedRoute"
                            @click="onClickRibbonTab">
        </vuestro-ribbon-tab>
      </div>
      <!--SLOT FOR USER WIDGETS-->
      <div class="vuestro-navbar-slot">
        <slot></slot>
      </div>
      <div class="vuestro-navbar-gutter"></div>
      <slot name="buttons-separator"></slot>
      <div class="vuestro-navbar-gutter"></div>
      <!--BUTTONS SLOT-->
      <slot name="buttons"></slot>
    </div>
    <!--RIBBON (ONLY FOR RIBBON VARIANT)-->
    <vuestro-ribbon v-if="variant === 'ribbon'" :open="ribbonOpen" :route="selectedRoute"></vuestro-ribbon>
  </div>
</template>

<script>

/* global _ */

export default {
  name: 'VuestroNavbar',
  props: {
    variant: { type: String, default: 'regular' },    // { regular, ribbon, mobile }
    gutter: { type: String, default: 'md' },          // provide built-in spacing between slots
    routes: { type: Array, default: null },       // vue-router compatible routes
  },
  watch: {
    '$route'() {
      this.showSidebar = false;
    }
  },
  data() {
    return {
      showSidebar: false,
      ribbonOpen: false,
      selectedRoute: null,
    };
  },
  beforeMount() {
    if (this.routes) {
      let matchedRoot = this.$route.matched[0];
      this.selectedRoute = _.find(this.routes, { path: matchedRoot.path });
    }
  },
  methods: {
    onClickRibbonTab(c) {
      if (c.children) {
        // toggle if the selected route is clicked again, otherwise open
        if (c === this.selectedRoute) {
          this.ribbonOpen = !this.ribbonOpen;
        } else {
          this.ribbonOpen = true;
        }
      } else {
        this.$router.push(c.path);
        this.ribbonOpen = false;
      }
      this.selectedRoute = c;
      console.log(this.ribbonOpen)
    },
  },
};

</script>

<style>
/* override these global css vars to set syle */
.vuestro-app {
  --vuestro-navbar-height: 60px;
  --vuestro-navbar-bg: var(--vuestro-content-bg);
  --vuestro-navbar-fg: var(--vuestro-text-color);
  --vuestro-navbar-border: transparent;
  --vuestro-ribbon-height: 80px;
}
.vuestro-app.mobile {
  --vuestro-navbar-height: 100px;
}
</style>

<style scoped>

.vuestro-navbar {
  width: 100%;
  background-color: var(--vuestro-navbar-bg);
  color: var(--vuestro-navbar-fg);
  border-bottom: 1px solid var(--vuestro-navbar-border);
  flex: none; /* don't let flexbox reduce our size */
  display: flex;
  flex-direction: column;
  z-index: 9999;
  position: relative;
  transition: background-color 0.4s;
}

.vuestro-navbar-navbar {
  height: var(--vuestro-navbar-height);
  display: flex;
  align-items: center;
  padding-right: 5px;
}

.vuestro-navbar.sm .vuestro-navbar-gutter {
  width: 0.25em;
}
.vuestro-navbar.md .vuestro-navbar-gutter {
  width: 0.5em;
}
.vuestro-navbar.lg .vuestro-navbar-gutter {
  width: 0.75em;
}
.vuestro-navbar.xl .vuestro-navbar-gutter {
  width: 1em;
}

.vuestro-navbar-logo {
  font-size: 2em;
  white-space: nowrap;
}

.vuestro-navbar-slot {
  display: flex;
  flex-grow: 1;
  align-self: stretch;
  align-items: center;
}

.vuestro-navbar-ribbon-tabs {
  height: 100%;
  display: flex;
  flex-grow: 1;
  align-items: flex-end;
  margin-left: 0.5em;
  margin-right: 0.5em;
  overflow: auto;
}

.vuestro-hamburger {
  margin-left: 10px;
}

.vuestro-mobile-sidebar-wrapper {
  position: fixed;
  top: var(--vuestro-navbar-height);
  bottom: 0;
  overflow: auto;
  left: 0;
  --vuestro-sidebar-bg: linear-gradient(to right, var(--vuestro-content-bg) 25%, rgba(255,255,255,0) 100%);
  --vuestro-sidebar-border: none;
}
.vuestro-dark .vuestro-mobile-sidebar-wrapper {
  --vuestro-sidebar-bg: linear-gradient(to right, var(--vuestro-content-bg) 25%, rgba(0,0,0,0) 100%);
}

.vuestro-mobile-sidebar-enter-active, .vuestro-mobile-sidebar-leave-active {
  transition: all 0.4s;
}
.vuestro-mobile-sidebar-enter, .vuestro-mobile-sidebar-leave-to {
  left: calc(var(--vuestro-sidebar-normal-width)*-1);
}

.vuestro-mobile-frosted {
  position: fixed;
  top: var(--vuestro-navbar-height);
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
.vuestro-mobile-frost-enter-active, .vuestro-mobile-frost-leave-active {
  transition: all 0.4s;
}
.vuestro-mobile-frost-enter, .vuestro-mobile-frost-leave-to {
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}

</style>