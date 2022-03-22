<template>
  <div class="vuestro-object-browser-item" :class="{ root: parent === 'root' }">
    <!--ISEMPTY MESSAGE-->
    <div v-if="empty" class="vuestro-object-browser-empty">{{ emptyMessage }}</div>
    <!--MAIN LOOP-->
    <div v-if="isString(data)">
      <div class="vuestro-object-browser-item-gutter"></div>
      <div class="vuestro-object-browser-item-string" title="String">
        {{ data }}
      </div>
    </div>
    <div v-else v-for="(v, k) in data">
      <div class="vuestro-object-browser-item">
        <div class="vuestro-object-browser-item-kv">
          <div class="vuestro-object-browser-item-gutter">
            <vuestro-caret v-if="isObject(v) || isArray(v)" :collapsed="isCollapsed(k)" @click="toggleCollapse(k)"></vuestro-caret>
          </div>
          <!--KEY TITLE-->
          <span class="vuestro-object-browser-item-key-title">{{ k }}:</span>
          <!--EDITING CONTROLS-->
          <template v-if="k === editKeyActive">
            <vuestro-text-field :value="v"
                                variant="outline"
                                no-margin
                                selected
                                editing-buttons
                                @save="onSave(k, v, ...arguments)"
                                @cancel="editKeyActive = ''">
            </vuestro-text-field>
          </template>
          <template v-else>
            <!--TYPE-DEPENDENT RENDERING-->
            <span v-if="isString(v)" class="vuestro-object-browser-item-string" title="String">{{ JSON.stringify(v) }}</span>
            <span v-if="isBoolean(v)" class="vuestro-object-browser-item-bool" title="Boolean">{{ v }}</span>
            <span v-if="isDate(v)" class="vuestro-object-browser-item-date" title="Date">{{ v.toISOString() }}</span>
            <span v-if="isNumber(v)" class="vuestro-object-browser-item-number" title="Number">{{ v }}</span>
            <span v-if="isArray(v)">Array[{{ v.length }}]</span>
            <span v-if="isObject(v)">Object[{{ Object.keys(v).length }}]</span>
            <span v-if="v === null" class="vuestro-object-browser-item-null">null</span>
            <span v-if="v === undefined" class="vuestro-object-browser-item-null">undefined</span>
            <span v-if="isEditable(k, v)" class="vuestro-object-editing-buttons">
              <vuestro-button round no-border no-margin size="sm" @click="onEditActive(k)">
                <vuestro-icon name="pen"></vuestro-icon>
              </vuestro-button>
            </span>
          </template>
          <!--SLOT TO ADD COMPONENTS AFTER VALUE-->
          <span class="vuestro-object-browser-item-slot">
            <slot name="post-value" :k="k" :v="v" :parent="parent"></slot>
          </span>
        </div>
        <div v-if="isObject(v) || isArray(v)">
          <div v-show="expanded.indexOf(k) >= 0" class="vuestro-object-browser-item-sub">
            <!--OMG RECURSION!!!-->
            <vuestro-object-browser :ref="k"
                                    :options="options"
                                    :data="v"
                                    :parent="k"
                                    @edit="onEditActive"
                                    @done="$emit('done')"
                                    @change="onChange">
              <template #post-value="{ k, v, parent }">
                <slot name=post-value :k="k" :v="v" :parent="parent"></slot>
              </template>
            </vuestro-object-browser>
          </div>
        </div>
      </div>
    </div>
    <!--EXTEND OBJECT-->
    <div v-if="isExtendable()" class="vuestro-object-add-member">
      <vuestro-button v-if="!addingMember" size="sm" round no-border no-margin @click="onAddMember">
        <vuestro-icon name="plus"></vuestro-icon>
      </vuestro-button>
      <!--ADD FIELD CONTROLS-->
      <template v-else>
        <vuestro-text-field variant="outline" no-margin v-model="newMemberKey" selected></vuestro-text-field>&nbsp;:&nbsp;
        <vuestro-text-field variant="outline"
                            no-margin
                            v-model="newMemberVal"
                            editing-buttons
                            @save="onSaveAddedMember"
                            @cancel="addingMember = false"
                            @keyup.enter="onSaveAddedMember">
        </vuestro-text-field>
      </template>
    </div>
  </div>
</template>

<script>

/* global _ */
import moment from 'moment';

export default {
  name: 'VuestroObjectBrowser',
  props: {
    data: { type: null },
    options: { type: Object, default: () => ({}) },
    parent: { type: null, default: 'root' }, // non-end-user property, used for recursion
  },
  data() {
    return {
      expanded: [],
      startExpanded: false,
      alwaysExpand: false,
      editable: false,
      extendable: false,
      emptyMessage: 'Empty',
      editKeyActive: '',
      addingMember: false,
      newMemberKey: '',
      newMemberVal: '',
    };
  },
  computed: {
    empty() {
      if (!this.data) {
        return true;
      } else {
        if (this.data && Object.keys(this.data).length == 0) {
          return true;
        }
      }
      return false;
    },
  },
  watch: {
    data() {
      if (this.alwaysExpand) {
        this.$nextTick(() => {
          this.expandAll();
        });
      }
    },
  },
  beforeMount() {
    _.merge(this, this.options);
  },
  mounted() {
    if (this.startExpanded) {
      this.expandAll();
    }
  },
  methods: {
    expandAll() {
      _.forEach(this.data, (d, i) => {
        if (this.$refs[i]) {
          this.$refs[i][0].expandAll();
        }
        this.expanded.push(i);
      });
    },
    collapseAll() {
      this.expanded = [];
      _.forEach(this.data, (d, i) => {
        if (this.$refs[i]) {
          this.$refs[i][0].collapseAll();
        }
      });
    },
    isCollapsed(d) {
      return this.expanded.indexOf(d) < 0;
    },
    isObject(d) {
      return _.isPlainObject(d);
    },
    isArray(d) {
      return _.isArray(d);
    },
    isBoolean(d) {
      return _.isBoolean(d);
    },
    isDate(d) {
      return _.isDate(d);
    },
    isString(d) {
      return _.isString(d);
    },
    isNumber(d) {
      return _.isNumber(d);
    },
    isEditable(key, value) {
      if (_.isFunction(this.editable)) {
        return this.editable(this.getFullPath(key), value);
      } else if (this.isObject(value) || this.isArray(value)) {
        return false;
      }
      return this.editable;
    },
    isExtendable() {
      if (_.isFunction(this.extendable)) {
        return this.extendable(this.parent);
      }
      return this.extendable;
    },
    toggleCollapse(d) {
      let idx = this.expanded.indexOf(d);
      if (idx < 0) {
        // add to expanded
        this.expanded.push(d);
      } else {
        // remove from expanded
        this.expanded.splice(idx, 1);
      }
    },
    getFullPath(key) {
      if (this.parent === 'root') {
        return key;
      }
      return `${this.parent}.${key}`;
    },
    onEditActive(k) {
      this.editKeyActive = k;
      this.$emit('edit', this.getFullPath(k));
    },
    onSave(k, origVal, newVal) {
      if (this.data) {
        this.data[k] = newVal;
      }
      this.editKeyActive = '';
      this.onChange(this.getFullPath(k), newVal);
    },
    onAddMember() {
      if (this.isArray(this.data)) {
        this.newMemberKey = this.data.length;
      }
      this.addingMember = true;
    },
    onSaveAddedMember() {
      if (this.data) {
        let v = this.newMemberVal;
        // try to promote type to bool, date, or number
        if (this.newMemberVal.match(/(true|false)/)) {
          v = this.newMemberVal === 'true';
        }
        if (this.newMemberVal.match(/[0-9\.]+/)) {
          v = parseFloat(this.newMemberVal);
        }
        let dt = moment(this.newMemberVal, moment.ISO_8601);
        if (dt.isValid()) {
          v = dt.toDate();
        }
        this.$set(this.data, this.newMemberKey, v);
        this.onChange(this.getFullPath(this.newMemberKey), v);
      }
      this.addingMember = false;
      this.newMemberKey = '';
      this.newMemberVal = '';
    },
    onChange(k, v) {
      this.$emit('change', k, v);
      this.$emit('done');
    }
  }
};

</script>

<style>

.vuestro-app {
  --vuestro-object-browser-key-fg: var(--vuestro-purple);
  --vuestro-object-browser-string-fg: var(--vuestro-orange);
  --vuestro-object-browser-bool-fg: var(--vuestro-blue);
  --vuestro-object-browser-date-fg: var(--vuestro-green);
  --vuestro-object-browser-number-fg: var(--vuestro-indigo);
  --vuestro-object-browser-null-fg: var(--vuestro-danger);
}
.vuestro-dark {
  --vuestro-object-browser-string-fg: #ea7638;
  --vuestro-object-browser-date-fg: #299a57;
  --vuestro-object-browser-bool-fg: #4b93de;
  --vuestro-object-browser-number-fg: #c232ff;
}

</style>

<style scoped>

.vuestro-object-browser-item {
  padding: 0 0.5em;
}

.vuestro-object-browser-item.root {
  padding-top: 0.4em;
  padding-left: 0.2em;
  padding-bottom: 0.4em;
}

.vuestro-object-browser-item > div {
  display: flex;
}

.vuestro-object-browser-item-gutter {
  width: 1.2em;
  flex: none;
}

.vuestro-object-browser-item-kv {
  display: flex;
  align-items: center;
}

.vuestro-object-browser-item-key-title {
  font-weight: 500;
  text-align: right;
  display: inline-block;
  min-width: 1em;
  margin-right: 0.4em;
  color: var(--vuestro-object-browser-key-fg);
  flex: none;
}

.vuestro-object-browser-item-string {
  color: var(--vuestro-object-browser-string-fg);
  word-break: break-all;
}

.vuestro-object-browser-item-bool {
  color: var(--vuestro-object-browser-bool-fg);
}

.vuestro-object-browser-item-date {
  color: var(--vuestro-object-browser-date-fg);
  font-weight: 500;
}

.vuestro-object-browser-item-number {
  color: var(--vuestro-object-browser-number-fg);
  font-weight: 500;
}

.vuestro-object-browser-item-null {
  color: var(--vuestro-object-browser-null-fg);
  font-weight: 500;
}

.vuestro-object-browser-item-slot {
  margin-left: 0.4em;
}

.vuestro-object-browser-empty {
  padding: 0.1em 1.2em;
}
/* decrease padding for empty root */
.vuestro-object-browser-item.root > .vuestro-object-browser-empty {
  padding-left: 0.5em;
}

.vuestro-object-editing-buttons {
  margin-left: 0.1em;
  margin-right: 0.1em;
}

.vuestro-object-add-member {
  padding: 0 1.3em;
}

</style>