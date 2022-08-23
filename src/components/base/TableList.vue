<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { TableColumn } from "../../interfaces/theme/table.interface";

// declarations
interface Props {
  title?: string;
  rows: Array<Object>;
  columns: Array<TableColumn>;
  rowKey: string;
  loading?: boolean;
  hasActions?: boolean;
  company?: boolean;
}
const props = defineProps<Props>();
const filter = reactive({
  search: "",
});
const pagination = ref({
  rowsPerPage: 10
})

// hooks
const data = computed(() => props.rows);
</script>

<template>
  <div class="q-pt-5">
    <q-table
      class="q-pt-lg"
      :rows="data"
      :columns="columns"
      :row-key="rowKey"
      :grid="$q.screen.lt.md"
      :loading="loading"
      :pagination="pagination"
      :filter="filter.search"
      no-data-label="I didn't find anything for you"
      wrap-cells
    >
      <template #top-left>
        <slot name="top-left">
          <div class="q-table__title" v-text="title"></div>
        </slot>
      </template>
      <template #top-right>
        <slot name="top-right">
          <q-input
            outlined
            dense
            debounce="300"
            v-model="filter.search"
            placeholder="Search"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-btn
            color="primary"
            outline
            icon="sync"
            @click="$emit('refresh', filter)"
            class="float-right q-ml-sm"
          >
            Refresh</q-btn
          >
        </slot>
      </template>
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
      <template #no-data>
        <div class="full-width row flex-center text-accent q-gutter-sm">
          <div v-if="loading">Loading ...</div>
          <div v-else>
            <q-icon size="2em" name="sentiment_dissatisfied" />
            <span> I didn't find anything for you </span>
          </div>
        </div>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            <slot :name="col.name" :obj="props.row" v-bind="props">
              {{ col.value }}
            </slot>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>
