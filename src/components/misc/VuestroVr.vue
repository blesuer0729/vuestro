// 'vertical rule'... it's just a line, hardly worth a component
//
<template>
  <div class="vuestro-vr"
       :class="[ size ]">
    <div></div>
  </div>
</template>

<script>

export default {
  name: 'VuestroVr',
  props: {
    size: { type: String, default: 'md' }, // affects the padding before the line starts
  },
};

</script>

<style scoped>

.vuestro-vr {
  align-self: stretch;
  display: flex;
  align-items: center;
}

.vuestro-vr > div {
  border-left: 1px solid var(--vuestro-outline);
}

.vuestro-vr.sm > div {
  height: 25%;
}
.vuestro-vr.md > div {
  height: 50%;
}
.vuestro-vr.lg > div {
  height: 75%;
}
.vuestro-vr.xl > div {
  height: 100%;
}


</style>