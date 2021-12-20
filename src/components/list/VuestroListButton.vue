<template>
  <div class="vuestro-list-button" :class="{ alt }" @click="onClick">
    <div class="vuestro-list-button-icon">
      <slot name="icon"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: 'VuestroListButton',
  props: {
    to: { type: String, default: null },
    alt: { type: Boolean, default: false },
  },
  methods: {
    onClick(e) {
      if (this.to) {
        this.$router.push(this.to);
      }
      this.$emit('click', e);
    }
  }
};

</script>

<style scoped>

.vuestro-list-button {
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 5px;
  position: relative;
  border-radius: var(--vuestro-selection-border-radius);
  display: flex;
  align-items: center;
}
.vuestro-list-button-icon {
  margin-right: 0.3em;
}

.vuestro-list-button:hover {
  background-color: var(--vuestro-list-item-selected-bg, var(--vuestro-selection));
  color: white;
}

.vuestro-list-button.alt::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,0.02);
}

</style>