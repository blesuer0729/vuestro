<template>
  <vuestro-panel stretch class="vuestro-table-panel">
    <template #title><span class="drag">{{ options.title }}</span></template>
    <vuestro-table :data="data"></vuestro-table>
  </vuestro-panel>
</template>

<script>

export default {
  name: 'VuestroTablePanel',
  props: {
    data: { required: true },
    options: { type: Object, required: true },
  },
};

</script>

<style scoped>

.vuestro-table-panel {
  overflow: hidden;
}

</style>