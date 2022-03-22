<template>
  <vuestro-table ref="theTable" :options="tableOptions" :data="data">
    <template #thead>
      <draggable tag="thead"
                 draggable=".vuestro-dynamic-table-header"
                 v-model="columns"
                 group="vuestro-dynamic-table"
                 @sort="onSort">
          <th v-for="item in columns" :key="item.id" class="vuestro-dynamic-table-header">
            <div class="vuestro-dynamic-table-pill-wrapper">
              <vuestro-pill draggable geopattern>
                <template #title>
                  {{ item.field }}
                </template>
                <template #title-buttons>
                  <vuestro-button round no-border no-margin variant="white"
                                  class="vuestro-table-header-sort"
                                  :class="{ active: $refs.theTable.isSortActive(item), desc: $refs.theTable.isSortDescending(item) }"
                                  @click="$refs.theTable.onSort(item)">
                    <vuestro-icon name="arrow-up"></vuestro-icon>
                  </vuestro-button>
                  <vuestro-button round no-border no-margin variant="white" @click="removeColumn(item)">
                    <vuestro-icon name="times"></vuestro-icon>
                  </vuestro-button>
                </template>
              </vuestro-pill>
              <template v-if="showFilters">
                <vuestro-multi-select placeholder="Include"
                                      @add="addFilter(item.field, ...arguments, 'include')"
                                      @remove="removeFilter(item.field, ...arguments, 'include')">
                </vuestro-multi-select>
                <vuestro-multi-select placeholder="Exclude"
                                      @add="addFilter(item.field, ...arguments, 'exclude')"
                                      @remove="removeFilter(item.field, ...arguments, 'exclude')">
                </vuestro-multi-select>
              </template>
            </div>
          </th>
          <th v-if="columns.length == 0" class="vuestro-dynamic-table-header"></th>
          <!--spacer for detail toggler caret: uses the 'header' slot of <draggable>-->
          <template slot="header">
            <th class="vuestro-dynamic-table-filter-header">
              <div class="vuestro-dynamic-table-filter-button-wrapper">
                <vuestro-button class="vuestro-dynamic-table-filter-button" stretch no-border no-margin :value="showFilters" @click="onToggleFilterBar">
                  <vuestro-icon name="filter"></vuestro-icon>
                </vuestro-button>
              </div>
              <div v-if="columns.length == 0" class="vuestro-dynamic-table-no-columns">
                Drag field here
              </div>
            </th>
          </template>
      </draggable>
    </template>
    <template #row="{ item }">
      <template v-for="c of checkColumn(item)">
        <draggable tag="td"
                   draggable="span"
                   :value="[c]"
                   :group="{ put: false, name: 'vuestro-multi-select' }"
                   @start="draggingValue = true"
                   @end = "draggingValue = false">
          <span>{{ c }}</span>
        </draggable>
      </template>
      <td v-if="columns.length == 0"></td>
    </template>
    <template #detail="{ item }">
      <draggable class="vuestro-dynamic-table-pill-tray"
                 :value="Object.keys(item)"
                 :group="{
                           name: 'vuestro-dynamic-table',
                           pull: 'clone',
                           put: false
                         }"
                 :sort="false"
                 :clone="getHeader">
        <div class="vuestro-dynamic-table-pill-wrapper" v-for="(v, k) of item" :key="k+v">
          <vuestro-pill draggable geopattern>
            <template #title>{{ k }}</template>
            <template #value>{{ v }}</template>
          </vuestro-pill>
        </div>
      </draggable>
    </template>
  </vuestro-table>
</template>

<script>

/* global _ */
import draggable from 'vuedraggable';

export default {
  name: 'VuestroDynamicTable',
  components: {
    draggable,
  },
  props: {
    data: { type: Array, default: () => [] },
    options: { type: Object, default: () => ({
      columns: [],
    })},
  },
  data() {
    return {
      showFilters: false,
      draggingValue: false,
      columns: [],
      tableOptions: {
        transparentHeader: true,
        columns: [],
      },
      numDefaultColumns: 5,
    };
  },
  watch: {
    data(newVal) {
      this.checkDefaultColumns();
    },
    columns(newVal) {
      this.tableOptions.columns = new Array(newVal.length);
    },
  },
  mounted() {
    this.checkDefaultColumns();
  },
  methods: {
    checkDefaultColumns() {
      // add some default columns if none were specified
      if (this.columns.length == 0) {
        if (this.options.columns && this.options.columns.length > 0) {
          for (let c of this.options.columns) {
            this.columns.push({
              field: c,
              padding: 0,
              id: _.uniqueId(Date.now()),
            });
          }
        } else {
          let keys = Object.keys(this.data[0]);
          for (let i=0; i<this.numDefaultColumns; i++) {
            this.columns.push({
              field: keys[i],
              padding: 0,
              id: _.uniqueId(Date.now()),
            });
          }
        }
      }
    },
    checkColumn(item) {
      let row = [];
      for (let c of this.columns) {
        row.push(item[c.field]);
      }
      return row;
    },
    removeColumn(item) {
      let idx = _.findIndex(this.columns, { field: item.field });
      this.columns.splice(idx, 1);
    },
    getHeader(d) {
      return {
        field: d,
        padding: 0,
        id: _.uniqueId(Date.now()),
      };
    },
    onSort() {
      this.$emit('change', _.flatMap(this.columns, 'field'));
    },
    addFilter(field, str, op) {
      this.$refs.theTable.addFilter(...arguments);
    },
    removeFilter(field, str, op) {
      this.$refs.theTable.removeFilter(...arguments);
    },
    onToggleFilterBar() {
      this.showFilters = !this.showFilters;
    },
  },
};

</script>

<style scoped>

.vuestro-dynamic-table-pill-tray {
  display: flex;
  flex-wrap: wrap;
}

.vuestro-dynamic-table-pill-wrapper {
  display: flex;
  align-items: center;
}

.vuestro-table thead > .sortable-ghost {
  margin: var(--vuestro-control-margin-v) var(--vuestro-control-margin-h);
}
.vuestro-table thead > .sortable-ghost >>> .vuestro-pill-title {
  background-color: var(--vuestro-orange);
}
.vuestro-table thead > .sortable-ghost >>> .vuestro-pill-value {
  display: none;
}
/* mod the multi-select to fit in the column header */
.vuestro-table >>> .vuestro-multi-draggable {
  flex-direction: column;
  align-items: flex-start;
  flex-wrap: nowrap;
}

.vuestro-table-header-sort {
  opacity: 0;
  transition: opacity 0.4s;
}
.vuestro-table-header-sort >>> svg {
  transition: transform 0.4s;
}
.vuestro-dynamic-table-pill-wrapper:hover .vuestro-table-header-sort {
  opacity: 0.7;
}
.vuestro-table-header-sort.active {
  opacity: 1;
  color: var(--vuestro-table-header-fg-active);
}
.vuestro-table-header-sort.desc >>> svg {
  transform: rotate(180deg);
}

.vuestro-table thead {
  height: 1px;
}
.vuestro-dynamic-table-header {
  height: inherit;
}
.vuestro-dynamic-table-header > .vuestro-dynamic-table-pill-wrapper,
.vuestro-dynamic-table-filter-button-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  --vuestro-control-margin-v: 0.1em;
}
.vuestro-dynamic-table-filter-button {
  transition: all 0.2s;
  margin-left: 0.1em;
  margin-right: 0.1em;
  height: 100%;
}
.vuestro-dynamic-table-filter-button >>> .vuestro-button-inner {
  height: 100%;
}

.vuestro-dynamic-table-filter-header {
  position: relative;
  height: inherit;
  padding: 0;
}
.vuestro-dynamic-table-no-columns {
  font-weight: 300;
  position: absolute;
  left: 120%;
  top: 50%;
  transform: translateY(-50%);
  white-space: nowrap;
}
</style>