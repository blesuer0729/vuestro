<template>
  <vuestro-container>
    <vuestro-card color="var(--vuestro-brick)">
      <template #heading>Notifications</template>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        VuestroNotification provides navbar-friendly notifications browser
      </template>
    </vuestro-card>

    <vuestro-card>
      <vuestro-button @click="emitNotification">Simulate Notification</vuestro-button>
    </vuestro-card>

  </vuestro-container>
</template>

<script>

export default {
  name: 'Notifications',
  data() {
    return {
    };
  },
	methods: {
		emitNotification() {
      this.$store.dispatch('addNotification', {
        _id: this.vuestroGenerateId(6),
        title: 'A New Alert!',
        description: 'This is a dynamically added notification!',
        created: new Date(),
        unread: true,
      });
		},
	},
};

</script>

<style scoped>

.example-container {
  display: flex;
  align-items: flex-start;
}
.example-container-center {
  display: flex;
  justify-content: center;
}
.example-container.dark:before {
  content: "Example Dark Background";
  position: absolute;
  top: 0;
  left: 0;
  color: white;
}
.example-container.dark {
  padding: 30px 20px 80px 10px;
  background-color: var(--vuestro-popup-bg);
  position: relative;
  justify-content: space-between;
}

.example-vertical-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

</style>