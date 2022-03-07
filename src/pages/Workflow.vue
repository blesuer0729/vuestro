<template>
  <vuestro-container>
    <vuestro-card color="var(--vuestro-cobalt)">
      <template #heading>Workflow</template>
      <template #subheading>Components to facilitate workflows and showing progress</template>
    </vuestro-card>

    <vuestro-card>
      <vuestro-button @click="$refs.theWorkflow.start()">Start Workflow</vuestro-button>
      <vuestro-workflow ref="theWorkflow"
                        title="My First Workflow"
                        :steps="workflowSteps">
      </vuestro-workflow>
    </vuestro-card>

  </vuestro-container>
</template>

<script>

export default {
  name: 'Workflow',
  data() {
    return {
      workflowSteps: [
        {
          id: 'step1',
          preTitle: 'Get new user id',
          postTitle: 'Got user id',
          icon: 'user',
          handler: this.getNewUserId,
        },
        {
          id: 'step2',
          preTitle: 'Create user in db',
          postTitle: 'User created',
          handler: this.createUser,
        },

      ],
    };
  },
  methods: {
    getNewUserId() {
      return new Promise((resolve, reject) => {
        setTimeout(resolve('new user id: 32fd3e9a90'), 2000);
      });
    },
    createUser() {
      return new Promise((resolve, reject) => {
        setTimeout(resolve('new user created'), 3000);
      });
    },
  },
};

</script>