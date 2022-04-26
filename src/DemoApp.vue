<template>
  <vuestro-app title="vuestro">
    <template #navbar>
      <vuestro-navbar :routes="$router.options.routes">
        <template #logo>
          <div class="logo">vuestro</div>
        </template>
        <template #logo-separator>
          <vuestro-vr></vuestro-vr>
        </template>
        <template #default>
          <!--DEMO WIDGET-->
          <vuestro-text-field variant="search"
                              stretch
                              size="lg">
            <template #dropdown>
              <vuestro-container no-wrap gutter="none">
                <vuestro-card cols="4" color='var(--vuestro-purple)'>
                  <template #heading>Search Tools</template>
                  <vuestro-list-button>Lots</vuestro-list-button>
                  <vuestro-list-button>of</vuestro-list-button>
                  <vuestro-list-button>Tools</vuestro-list-button>
                </vuestro-card>
                <vuestro-card cols="8">
                  <template #heading>You can put anything in here to help users search...</template>
                  <vuestro-container gutter="none">
                    <vuestro-button v-for="b in 10" :key="b" @click="exampleText = `Button ${b}`">Button {{ b }}</vuestro-button>
                  </vuestro-container>
                </vuestro-card>
              </vuestro-container>
            </template>
          </vuestro-text-field>
        </template>
        <template #buttons>
          <vuestro-notifications grouped></vuestro-notifications>
        </template>
      </vuestro-navbar>
    </template>
    <template #sidebar>
      <vuestro-sidebar :mini="isSidebarMini"
                       @update:mini="onSetSidebar">
        <template #header="{ mini }">
          <vuestro-user-button variant="sidebar"
                               :user="user"
                               :avatar="userImg"
                               :role="role"
                               :hideText="mini"
                               @click="onUserImgClick">
          </vuestro-user-button>
        </template>
      </vuestro-sidebar>
    </template>

    <template #footer>
      <p class="default-footer">Vuestro ❤ Vue</p>
    </template>

  </vuestro-app>
</template>

<script>

/* global VERSION, Vuex */

export default {
  name: 'app',
  data() {
    return {
      version: VERSION,
      logo: require('@/assets/logo.png'),
      user: 'A Vue User',
      userImg: require('@/assets/default-user.jpg'),
      role: 'Admin',
    };
  },
  computed: {
    ...Vuex.mapGetters(['isSidebarMini']),
  },
  methods: {
    onSetSidebar(d) {
      this.$store.dispatch('setSidebarMini', d);
    },
    onUserImgClick() {
      console.log('user img clicked');
    },
  }
};
</script>

<style>

body {
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
}

.default-footer {
  height: 30px;
  text-align: center;
}

.logo-img {
  height: 40px;
  width: auto;
}

.logo {
  font-weight: 300;
  padding-left: 0.4em;
  padding-right: 0.4em;
}

.vuestro-sidebar {
  --vuestro-sidebar-radius: var(--vuestro-control-border-radius);
}

</style>
