// Can be used to display user info, uses the username to render a geopattern background
//
//
// CSS Vars:
//  --vuestro-user-button-fg
//  --vuestro-user-button-border-radius -
//  --vuestro-user-button-image-size - height of image, auto width
//
//
<template>
  <vuestro-geo-pattern class="vuestro-user-button"
                       :class="[ variant ]"
                       :seed="user"
                       @color="(c) => {this.geoColor = c}">
    <vuestro-container column gutter="none">
      <vuestro-container gutter="none" no-wrap>
        <div v-if="avatar" class="vuestro-user-button-avatar-wrapper">
          <img :src="avatar"
               :class="{ clickable: $listeners.click }"
               @click="onAvatarClick"/>
        </div>
        <transition name="vuestro-user-button" mode="out-in">
          <div v-if="!hideText" class="vuestro-user-button-text">
            <span class="vuestro-user-button-user">{{ user }}</span>
            <span>{{ role }}</span>
          </div>
        </transition>
      </vuestro-container>
      <div v-if="$slots.default" class="vuestro-user-button-content">
        <slot></slot>
      </div>
    </vuestro-container>
  </vuestro-geo-pattern>
</template>

<script>

export default {
  name: 'VuestroUserButton',
  props: {
    user: { type: String, default: '' },          // username
    avatar: { type: String, default: require('@/assets/default-user.jpg') }, // user avatar
    role: { type: [String, Array], default: '' }, // user role, either string or array of strings
    link: { type: String, default: '' },          // user link
    variant: { type: String, default: 'button' }, // { button, sidebar }
    hideText: { type: Boolean, default: false },  // force hides the text
  },
  methods: {
    onAvatarClick() {
      if (this.$listeners.click) {
        this.$emit('click');
      }
    },
  },
};

</script>

<style>

.vuestro-app {
  --vuestro-user-button-image-size: 2em;
}

</style>

<style scoped>

.vuestro-user-button {
  display: flex;
  justify-content: flex-start;
  color: var(--vuestro-user-button-fg, white);
  padding: var(--vuestro-user-button-padding, 1em);
  margin: var(--vuestro-control-margin-v) var(--vuestro-control-margin-h);
  border-radius: var(--vuestro-user-button-border-radius, 1em);
}
/*SIDEBAR VARIANT*/
.vuestro-user-button.sidebar {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  margin-left: 0;
  padding-left: 0.5em;
  margin-right: 0.5em;
}

.vuestro-user-button-avatar-wrapper {
  display: flex;
}

.vuestro-user-button-avatar-wrapper > img {
  align-self: center;
  width: auto;
  height: var(--vuestro-user-button-avatar-height, 3em);
  border-radius: var(--vuestro-user-button-avatar-radius, 50%);
}
.vuestro-user-button img.clickable {
  cursor: pointer;
}

.vuestro-user-button-text {
  align-self: center;
  display: flex;
  flex-direction: column;
  margin-left: 0.7em;
  overflow: hidden;
  cursor: default;
}
.vuestro-user-button-text > span {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.vuestro-user-button-text .vuestro-user-button-user {
  font-weight: 700;
}

.vuestro-user-button-content {
  margin-top: 0.5em;
}

/*transitions*/
.vuestro-user-button-enter-active, .vuestro-user-buttonleave-active {
  transition: all 1s;
}
.vuestro-user-button-enter, .vuestro-user-button-leave-to {
  opacity: 0;
}


</style>