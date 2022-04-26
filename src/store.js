//
// This Vuex store is ONLY used for Vuestro standalone instance
//

/* global Vue, _ */
const Vuex = require('vuex');
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isDarkUI: true,
    isSidebarMini: true,
    notifications: [
      {
        _id: 'testid1',
        title: 'Clickable Alert',
        description: 'There\'s a new notifications component!',
        path: '/popups/notifications',
        created: new Date(),
        unread: true,
      },
      {
        _id: 'testid2',
        title: 'Non-clickable Alert',
        description: 'Just wanted to let you know you\'re awesome!',
        created: new Date(),
        unread: true,
      },
      {
        _id: 'testid3',
        title: 'Already-read Alert',
        description: 'This alert was previously clicked on',
        created: new Date(),
        unread: false,
      },
    ],
    fileTree: {
      name: '/',
      directories: [
        {
          name: 'Documents',
          directories: [
            {
              name: 'Work',
              files: [
                {
                  name: 'inventory.xlsx',
                  size: 323432,
                },
              ],
            },
          ],
          files: [
            {
              name: 'wordDoc.docx',
              size: 97323,
            },
          ],
        },
        {
          name: 'Pictures',
          files: [
            {
              name: 'image1.jpg',
              size: 323432,
            },
            {
              name: 'image2.jpg',
              size: 323432,
            },
          ],
        },
      ],
      files: [
        {
          name: 'config.cfg',
          size: 232,
        }
      ]
    },
  },
  getters: {
    isDarkUI(state) {
      return state.isDarkUI;
    },
    isSidebarMini(state) {
      return state.isSidebarMini;
    },
    notifications(state) {
      return state.notifications;
    },
    fileTree(state) {
      return state.fileTree;
    },
    getFileTreePath: (state) => (path) => {
      if (path === '/') {
        return state.fileTree;
      }
      let getDir = function(o, p) {
        if (o.directories) {
          for (let d of o.directories) {
            if (d.name === p[0]) {
              if (p.length > 1) {
                return getDir(d, p.slice(1));
              } else {
                return d;
              }
            }
          }
        }
      };

      return getDir(state.fileTree, path.split('/').slice(1));
    },
  },
  actions: {
    toggleIsDarkUI({ commit }) {
      commit('toggleIsDarkUI');
    },
    setSidebarMini({ commit }, val=true) {
      commit('setSidebarMini', val);
    },
    notificationRead({ commit }, id) {
      commit('notificationRead', id);
    },
    addNotification({ commit }, obj) {
      commit('addNotification', obj);
    },
    notificationsClear({ commit }) {
      commit('notificationsClear');
    },
  },
  mutations: {
    toggleIsDarkUI(state) {
      state.isDarkUI = !state.isDarkUI;
    },
    setSidebarMini(state, val) {
      state.isSidebarMini = val;
    },
    notificationRead(state, _id) {
      let n = _.find(state.notifications, { _id });
      Vue.set(n, 'unread', false);
    },
    addNotification(state, obj) {
      state.notifications.push(obj);
    },
    notificationsClear(state) {
      state.notifications = [];
    },
  },
});