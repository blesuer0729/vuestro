<template>
  <vuestro-container>
    <vuestro-card cols="12" color="#f47633">
      <template #heading>Buttons</template>
      <template #description>
        Buttons come in all shapes and sizes. Vuestro attempts to provide a flexible implementation suitable for the most common applications in an attractive, easily-configurable component. Outline mode is the default look and feel, but Vue props allow many other options.
      </template>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        Basic button
      </template>
      <div class="example-flexbox">
        <vuestro-button @click="onClick">Button</vuestro-button>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        Basic button with a VuestroIcon in the default slot
      </template>
      <div class="example-flexbox">
        <vuestro-button @click="onClick">
          <vuestro-icon name="flag"></vuestro-icon>
        </vuestro-button>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        <span>
          Set <vuestro-code>show-slot-on-hover</vuestro-code> property to only show default slot when button is hovered
        </span>
      </template>
      <div class="example-flexbox">
        <vuestro-button @click="onClick" show-slot-on-hover>
          <template #icon>
            <vuestro-icon name="flag"></vuestro-icon>
          </template>
          <template #default>
            Default Slot
          </template>
        </vuestro-button>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        <span>
          Basic button with VuestroIcon in <vuestro-code>#icon</vuestro-code> template to add proper spacing
        </span>
      </template>
      <div class="example-flexbox">
        <vuestro-button @click="onClick">
          <template #icon>
            <vuestro-icon name="tractor"></vuestro-icon>
          </template>
          Default Slot
        </vuestro-button>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        Basic button with placeholder
      </template>
      <div class="example-flexbox">
        <vuestro-button @click="onClick">
          <template #placeholder>Placeholder</template>
          Value md
        </vuestro-button>
        <vuestro-button size="lg" @click="onClick">
          <template #placeholder>Placeholder</template>
          Value lg
        </vuestro-button>
        <vuestro-button size="xl" @click="onClick">
          <template #placeholder>Placeholder</template>
          Value xl
        </vuestro-button>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        <span>
          ...make pills by setting the <vuestro-code>pill</vuestro-code> property
        </span>
      </template>
      <div class="example-flexbox">
        <vuestro-button pill @click="onClick">
          <vuestro-icon name="capsules"></vuestro-icon>
        </vuestro-button>
        <vuestro-button pill @click="onClick">Pill-shaped Button</vuestro-button>
        <vuestro-button pill @click="onClick">
          <template #icon>
            <vuestro-icon name="capsules"></vuestro-icon>
          </template>
          Pill-shaped Button
        </vuestro-button>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        <span>Add shadow by setting the <vuestro-code>shadow</vuestro-code> property</span>
      </template>
      <div class="example-flexbox">
        <vuestro-button rounded shadow>
          <span>Shadow</span>
        </vuestro-button>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        ...or go all the way by setting the round property
      </template>
      <div class="example-flexbox">
        <vuestro-button round size="sm">
          <vuestro-icon name="download"></vuestro-icon>
        </vuestro-button>
        <vuestro-button round>
          <vuestro-icon name="download"></vuestro-icon>
        </vuestro-button>
        <vuestro-button round size="lg">
          <vuestro-icon name="download"></vuestro-icon>
        </vuestro-button>
        <vuestro-button round size="xl">
          <vuestro-icon name="download"></vuestro-icon>
        </vuestro-button>
        <vuestro-button round size="sm">
          <vuestro-icon name="pen"></vuestro-icon>
        </vuestro-button>
        <vuestro-button round>
          <vuestro-icon name="pen"></vuestro-icon>
        </vuestro-button>
        <vuestro-button round size="lg">
          <vuestro-icon name="pen"></vuestro-icon>
        </vuestro-button>
        <vuestro-button round size="xl">
          <vuestro-icon name="pen"></vuestro-icon>
        </vuestro-button>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        <span>Set the <vuestro-code>size</vuestro-code> property {'sm', 'md', 'lg', 'xl'} to affect the size of the button</span>
      </template>
      <div class="example-flexbox">
        <vuestro-button size="sm"><vuestro-icon name="tractor"></vuestro-icon></vuestro-button>
        <vuestro-button size="sm">
          <template #icon>
            <vuestro-icon name="tractor"></vuestro-icon>
          </template>
          SM Button
        </vuestro-button>
        <vuestro-button size="md"><vuestro-icon name="tractor"></vuestro-icon></vuestro-button>
        <vuestro-button size="md" variant="success">
          <template #icon>
            <vuestro-icon name="tractor"></vuestro-icon>
          </template>
          md(default) Button
        </vuestro-button>
        <vuestro-button size="lg"><vuestro-icon name="tractor"></vuestro-icon></vuestro-button>
        <vuestro-button size="lg">
          <template #icon>
            <vuestro-icon name="tractor"></vuestro-icon>
          </template>
          lg Button
        </vuestro-button>
        <vuestro-button size="xl"><vuestro-icon name="tractor"></vuestro-icon></vuestro-button>
        <vuestro-button size="xl">
          <template #icon>
            <vuestro-icon name="tractor"></vuestro-icon>
          </template>
          xl Button
        </vuestro-button>
      </div>
      <div class="example-flexbox">
        <vuestro-button round size="sm"><vuestro-icon name="tractor"></vuestro-icon></vuestro-button>
        <vuestro-button pill size="sm">
          <template #icon>
            <vuestro-icon name="tractor"></vuestro-icon>
          </template>
          SM Button
        </vuestro-button>
        <vuestro-button round size="md"><vuestro-icon name="tractor"></vuestro-icon></vuestro-button>
        <vuestro-button pill size="md">
          <template #icon>
            <vuestro-icon name="tractor"></vuestro-icon>
          </template>
          md(default) Button
        </vuestro-button>
        <vuestro-button round size="lg"><vuestro-icon name="tractor"></vuestro-icon></vuestro-button>
        <vuestro-button pill size="lg">
          <template #icon>
            <vuestro-icon name="tractor"></vuestro-icon>
          </template>
          lg Button
        </vuestro-button>
        <vuestro-button round size="xl"><vuestro-icon name="tractor"></vuestro-icon></vuestro-button>
        <vuestro-button pill size="xl">
          <template #icon>
            <vuestro-icon name="tractor"></vuestro-icon>
          </template>
          xl Button
        </vuestro-button>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        <span>
          Button variant can be changed by setting the <vuestro-code>variant</vuestro-code> property
        </span>
      </template>
      <div class="example-flexbox">
        <vuestro-button variant="primary">primary</vuestro-button>
        <vuestro-button variant="secondary">secondary</vuestro-button>
        <vuestro-button variant="success">success</vuestro-button>
        <vuestro-button variant="warning">warning</vuestro-button>
        <vuestro-button variant="danger">danger</vuestro-button>
        <vuestro-button variant="info">info</vuestro-button>
        <vuestro-button variant="white">white</vuestro-button>
        <vuestro-button variant="black">black</vuestro-button>
        <vuestro-button variant="text">text</vuestro-button>
        <vuestro-button variant="link">link</vuestro-button>
      </div>
      <div class="example-flexbox">
        <vuestro-button value variant="primary">primary</vuestro-button>
        <vuestro-button value variant="secondary">secondary</vuestro-button>
        <vuestro-button value variant="success">success</vuestro-button>
        <vuestro-button value variant="warning">warning</vuestro-button>
        <vuestro-button value variant="danger">danger</vuestro-button>
        <vuestro-button value variant="info">info</vuestro-button>
        <vuestro-button value variant="white">white</vuestro-button>
        <vuestro-button value variant="black">black</vuestro-button>
        <vuestro-button value variant="text">text</vuestro-button>
        <vuestro-button value variant="link">link</vuestro-button>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        <span>
          Go buttons without borders by setting the <vuestro-code>no-border</vuestro-code> property
        </span>
      </template>
      <div class="example-flexbox">
        <vuestro-button no-border variant="primary">primary</vuestro-button>
        <vuestro-button no-border variant="secondary">secondary</vuestro-button>
        <vuestro-button no-border variant="success">success</vuestro-button>
        <vuestro-button no-border variant="warning">warning</vuestro-button>
        <vuestro-button no-border variant="danger">danger</vuestro-button>
        <vuestro-button no-border variant="info">info</vuestro-button>
        <vuestro-button no-border variant="white">white</vuestro-button>
        <vuestro-button no-border variant="black">black</vuestro-button>
        <vuestro-button no-border variant="text">text</vuestro-button>
        <vuestro-button no-border variant="link">link</vuestro-button>
        <vuestro-button no-border round size="sm">
          <vuestro-icon name="download"></vuestro-icon>
        </vuestro-button>
        <vuestro-button no-border round size="sm">
          <vuestro-icon name="external-link-alt"></vuestro-icon>
        </vuestro-button>
        <vuestro-button no-border pill size="sm">
          <vuestro-icon name="download"></vuestro-icon>
          <span>Download</span>
        </vuestro-button>
        <vuestro-button no-border round>
          <vuestro-icon name="download"></vuestro-icon>
        </vuestro-button>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        <span>Enable checkbox mode by setting the <vuestro-code>checkbox</vuestro-code> property</span>
      </template>
      <div>
        <vuestro-button variant="info" size="sm" checkbox v-model="exampleCheckbox">Slot content automatically renders beside it!</vuestro-button>
        <vuestro-button variant="secondary" size="md" checkbox v-model="exampleCheckbox">Slot content automatically renders beside it!</vuestro-button>
        <vuestro-button variant="warning" size="lg" checkbox v-model="exampleCheckbox">Slot content automatically renders beside it!</vuestro-button>
        <vuestro-button variant="success" size="xl" checkbox v-model="exampleCheckbox">Slot content automatically renders beside it!</vuestro-button>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        Provide v-model without the checkbox property to enable toggle mode
      </template>
      <div class="example-flexbox">
        <vuestro-button variant="primary" v-model="exampleCheckbox">I can toggle!</vuestro-button>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        ...or simply define the value prop for a simple colorized button
      </template>
      <div class="example-flexbox">
        <vuestro-button variant="primary" value>Button</vuestro-button>
        <vuestro-button variant="success" value pill>Button</vuestro-button>
        <vuestro-button variant="warning" value round>
          <vuestro-icon name="bug"></vuestro-icon>
        </vuestro-button>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        <span>
          Buttons will stretch to available space by setting the <vuestro-code>stretch</vuestro-code> property
        </span>
      </template>
      <vuestro-button stretch>Button</vuestro-button>
      <vuestro-button pill stretch>Button</vuestro-button>
      <vuestro-button stretch justify="flex-start">flex-start justified</vuestro-button>
      <vuestro-button stretch justify="flex-start">
        <template #placeholder>Type</template>
        flex-start justified with placeholder
      </vuestro-button>
    </vuestro-card>


    <vuestro-card>
      <template #description>
        <span>Disable the button by setting the <vuestro-code>disabled</vuestro-code> propery</span>
      </template>
      <div class="example-flexbox">
        <vuestro-button disabled @click="onClick">Disabled Button</vuestro-button>
        <vuestro-button disabled @click="onClick" rounded value>Disabled Button</vuestro-button>
        <vuestro-button disabled @click="onClick" pill>Disabled Button</vuestro-button>
        <vuestro-button disabled @click="onClick" variant="primary">Disabled Button</vuestro-button>
        <vuestro-button disabled @click="onClick" pill no-border>Disabled Button</vuestro-button>
        <vuestro-button disabled @click="onClick" round no-border>
          <vuestro-icon name="download"></vuestro-icon>
        </vuestro-button>
        <vuestro-button disabled @click="onClick" checkbox value>checkbox</vuestro-button>
      </div>
    </vuestro-card>


    <vuestro-card>
      <template #description>
        <span>Enable dense arrangements by setting the <vuestro-code>no-margin</vuestro-code> property</span>
      </template>
      <div class="example-calculator">
        <vuestro-button no-margin stretch variant="primary">7</vuestro-button>
        <vuestro-button no-margin stretch variant="primary">8</vuestro-button>
        <vuestro-button no-margin stretch variant="primary">9</vuestro-button>
        <vuestro-button no-margin stretch variant="primary">4</vuestro-button>
        <vuestro-button no-margin stretch variant="primary">5</vuestro-button>
        <vuestro-button no-margin stretch variant="primary">6</vuestro-button>
        <vuestro-button no-margin stretch variant="primary">1</vuestro-button>
        <vuestro-button no-margin stretch variant="primary">2</vuestro-button>
        <vuestro-button no-margin stretch variant="primary">3</vuestro-button>
      </div>
      <div class="example-calculator">
        <vuestro-button no-margin stretch variant="primary">0</vuestro-button>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #description>
        <span>Get a tall icon + text button by setting <vuestro-code>size="tall"</vuestro-code></span>
      </template>
      <div class="example-tall-button-container">
        <vuestro-button size="tall">
          <template #icon>
            <vuestro-icon name="download"></vuestro-icon>
          </template>
          Download
        </vuestro-button>
        <vuestro-button size="tall" rounded>
          <template #icon>
            <vuestro-icon name="file"></vuestro-icon>
          </template>
          Export
        </vuestro-button>
      </div>
    </vuestro-card>

    <vuestro-card>
      <template #subheading>Events</template>
      <template #description>Hover over the button to see the event emitted: {{ exampleEvent }}</template>
      <vuestro-container>
        <vuestro-button @enter="exampleEvent = 'enter'" @leave="exampleEvent = 'leave'" @click="exampleEvent = 'click'">I Emit Events</vuestro-button>
      </vuestro-container>
    </vuestro-card>

    <vuestro-card>
      <template #subheading>VuestroUserButton</template>
      <template #description>A user tile</template>
      <vuestro-container>
        <vuestro-user-button user="Test User" role="User Role">
          Provides a slot for user info
        </vuestro-user-button>
      </vuestro-container>
    </vuestro-card>

  </vuestro-container>
</template>

<script>

import Icon from 'vue-awesome/components/Icon';

export default {
  name: 'Buttons',
  components: {
    Icon,
  },
  data() {
    return {
      exampleCheckbox: true,
      exampleEvent: '',
    };
  },
  methods: {
    onClick() {
      console.log('click');
    },
  },
};

</script>

<style scoped>

.example-flexbox {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}

.example-calculator {
  display: flex;
  flex-wrap: wrap;
  width: 100px;
}
.example-calculator .vuestro-button {
  min-width: 30px;
}

.example-flexbox.dark {
  padding: 40px;
  background-color: var(--vuestro-popup-bg);
  position: relative;
}
.example-flexbox.dark:before {
  content: "Example Dark Background";
  position: absolute;
  top: 0;
  left: 0;
  color: white;
}

.example-tall-button-container {
  display: flex;
}

</style>