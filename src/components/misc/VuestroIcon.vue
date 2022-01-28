<template>
  <span class="vuestro-icon"
        :class="[`vuestro-icon-${variant}`]">
    <icon :name="name"
          :scale="scale"
          :spin="spin"
          :inverse="inverse"
          :pulse="pulse"
          :flip="flip"
          :label="label"
          :title="title"></icon>
    <slot></slot>
  </span>
</template>

<script>

// import all icons, creates bloat, but there's just no
// way to know what a user might want a priori
import 'vue-awesome/icons';
import Icon from 'vue-awesome/components/Icon';

export default {
  name: 'VuestroIcon',
  components: {
    Icon,
  },
  props: {
    name: { type: String, required: true },
    scale: { type: null },
    spin: { type: Boolean, default: false },
    inverse: { type: Boolean, default: false },
    pulse: { type: Boolean, default: false },
    flip: { type: String, default: null },
    label: { type: String },
    title: { type: String },
    variant: { type: String, default: 'none' },
  },
};

</script>

<style scoped>

.vuestro-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.vuestro-icon-primary > svg {
  fill: var(--vuestro-primary);
}
.vuestro-icon-secondary > svg {
  fill: var(--vuestro-secondary);
}
.vuestro-icon-success > svg {
  fill: var(--vuestro-success);
}
.vuestro-icon-warning > svg {
  fill: var(--vuestro-warning);
}
.vuestro-icon-danger > svg {
  fill: var(--vuestro-danger);
}
.vuestro-icon-info > svg {
  fill: var(--vuestro-info);
}


.vuestro-app.mobile .vuestro-icon > svg {
  width: 0.8em;
  height: 0.8em;
}

</style>