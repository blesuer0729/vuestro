<template>
  <div class="vuestro-no-data" :class="{ noMargin }">
    <vuestro-icon name="ghost" scale=1.6></vuestro-icon>
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: 'VuestroNoData',
  props: {
    noMargin: { type: Boolean, default: false },
  },
};

</script>

<style scoped>

.vuestro-no-data {
  font-size: 1.1em;
  margin: 1em;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.vuestro-no-data.noMargin {
  margin: 0;
}

.vuestro-no-data > .vuestro-icon {
  margin-bottom: 0.3em;
}

</style>