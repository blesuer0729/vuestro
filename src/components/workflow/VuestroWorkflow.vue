//
//
// CSS Vars:
//  --vuestro-workflow-idle-color
//  --vuestro-workflow-running-color
//  --vuestro-workflow-complete-color
//  --vuestro-workflow-cancelled-color
//  --vuestro-workflow-error-color
//
<template>
  <vuestro-panel class="vuestro-workflow">
    <template #title>{{ title }}</template>
    <vuestro-container gutter="none">
      <!--STATUS BAR-->
      <vuestro-card gutter="sm" class="vuestro-workflow-status-bar">
        <vuestro-container gutter="none" justify="space-between">
          <vuestro-pill v-if="mode === 'idle'"
                        color="var(--vuestro-workflow-idle-color)"
                        variant="capsule badge">
            <template #title>{{ idleTitle }}</template>
          </vuestro-pill>
          <vuestro-pill v-else-if="mode === 'running'"
                        color="var(--vuestro-workflow-running-color)"
                        variant="capsule badge">
            <template #title>{{ runningTitle }}</template>
            <template #value>
              <vuestro-container gutter="none" grow="1" align="center">
                <vuestro-icon name="spinner" pulse></vuestro-icon>
              </vuestro-container>
            </template>
          </vuestro-pill>
          <template v-else-if="mode === 'cancelled'">
            <vuestro-pill
                          color="var(--vuestro-workflow-cancelled-color)"
                          variant="capsule">
              <template #title>Cancelled</template>
              <template #value>after {{ elapsedSecs | vuestroHMS }}</template>
            </vuestro-pill>
            <vuestro-button round no-border @click="start">
              <vuestro-icon name="redo"></vuestro-icon>
            </vuestro-button>
          </template>
          <div v-else-if="mode === 'complete'" class="vuestro-workflow-complete">{{ completeTitle }}</div>
          <div v-else-if="mode === 'error'" class="vuestro-workflow-error">{{ errorTitle }}</div>
          <div v-if="isRunning" class="vuestro-workflow-elapsed">
            <vuestro-label>{{ elapsedSecs | vuestroHMS }}</vuestro-label>
            <vuestro-button variant="danger" @click="cancel">Cancel</vuestro-button>
          </div>
        </vuestro-container>
      </vuestro-card>
      <!--WORKFLOW STEPS-->
      <vuestro-card gutter="sm" v-for="s in liveSteps" :key="s.id">
        <vuestro-panel class="vuestro-workflow-step-panel">
          <template #title>
            <vuestro-container gutter="none" align="center">
              <vuestro-label v-if="s.icon" flush-left>
                <vuestro-icon :name="s.icon"></vuestro-icon>
              </vuestro-label>
              {{ s.preTitle }}
            </vuestro-container>
          </template>

        </vuestro-panel>
      </vuestro-card>
    </vuestro-container>
  </vuestro-panel>
</template>

<script>

export default {
  name: 'VuestroWorkflow',
  props: {
    title: { type: String, default: 'Workflow' },
    steps: { type: Array, required: true },
    idleTitle: { type: String, default: 'Idle' },
    runningTitle: { type: String, default: 'Running...' }, // string to use for running state
    completeTitle: { type: String, default: 'Complete' },  // string to use for complete state
    errorTitle: { type: String, default: 'Error' },        // string to use for error state
    allowRestart: { type: Boolean, default: false },       // adds a restart button
  },
  data() {
    return {
      mode: 'idle', //  { idle, running, complete, error }
      liveSteps: [],
      elapsedSecs: 0,
    };
  },
  computed: {
    isRunning() {
      return this.mode === 'running';
    },
  },
  watch: {
    steps(newVal) {
      this.processSteps();
    },
  },
  mounted() {
    // timer to increment elapsedSecs if running
    setInterval(() => {
      if (this.mode === 'running') {
        this.elapsedSecs++;
      }
    }, 1000);
    this.processSteps();
  },
  methods: {
    processSteps() {
      this.liveSteps = [];
      for (let s of this.steps) {
        this.liveSteps.push({
          ...s,
          state: 'waiting',
        });
      }
    },
    start() {
      console.log('starting workflow');
      this.elapsedSecs = 0;
      this.mode = 'running';
    },
    cancel() {
      this.mode = 'cancelled';
    },
  },
};

</script>

<style>

.vuestro-app {
  --vuestro-workflow-idle-color: var(--vuestro-secondary);
  --vuestro-workflow-running-color: var(--vuestro-primary);
  --vuestro-workflow-complete-color: var(--vuestro-success);
  --vuestro-workflow-cancelled-color: var(--vuestro-warning);
  --vuestro-workflow-error-color: var(--vuestro-danger);
}

</style>

<style scoped>

.vuestro-workflow {
  --vuestro-panel-toolbar-bg: var(--vuestro-content-bg-alt);
  --vuestro-panel-bg: var(--vuestro-content-bg);
}

.vuestro-workflow-status-bar {
  background-color: var(--vuestro-content-bg);
}

.vuestro-workflow-running {
  display: flex;
  align-items: center;
  color: var(--vuestro-workflow-running-color);
}
.vuestro-workflow-complete {
  display: flex;
  align-items: center;
  color: var(--vuestro-workflow-complete-color);
}
.vuestro-workflow-error {
  display: flex;
  align-items: center;
  color: var(--vuestro-workflow-error-color);
}

.vuestro-workflow-elapsed {
  display: flex;
  align-items: center;
}

.vuestro-workflow-step-panel {
  --vuestro-panel-toolbar-bg: transparent;
  --vuestro-panel-bg: var(--vuestro-content-bg-alt);
}


</style>