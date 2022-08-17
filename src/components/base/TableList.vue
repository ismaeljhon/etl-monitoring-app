<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { TableColumn } from "../../interfaces/theme/table.interface";
import Modal from "./Modal.vue";

// declarations
interface Props {
  title?: string;
  rows: Array<Object>;
  columns: Array<TableColumn>;
  rowKey: string;
  output?: boolean;
  loading?: boolean;
  hasActions?: boolean;
  company?: boolean;
}
const props = defineProps<Props>();
const router = useRouter();
const dialog = ref();
const filter = ref("");

// hooks
const data = computed(() => props.rows);
</script>

<template>
  <div class="q-pt-5">
    <div class="row q-mb-xs">
      <div class="col col-md-4">
        <slot name="top-left">&nbsp;</slot>
      </div>
      <div class="col col-md-4">
        <slot name="top-middle">&nbsp;</slot>
      </div>
      <div class="col col-md-4">
        <slot name="top-right">&nbsp;</slot>
      </div>
    </div>
    <q-table
      class="q-pa-lg q-ma-lg"
      :title="title"
      :rows="data"
      :columns="columns"
      :row-key="rowKey"
      :grid="$q.screen.lt.md"
      :loading="loading"
      :filter="filter"
      wrap-cells
    >
      <template v-slot:top-right>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:item="props">
        <div
          class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
          :style="props.selected ? 'transform: scale(0.95);' : ''"
        >
          <q-card :class="props.selected ? 'bg-grey-2' : ''">
            <q-card-section>
              <slot
                v-for="col in props.cols"
                :name="col.name"
                :obj="props.row"
                v-bind="props"
              >
                {{ col.action ? col.value : ''  }}
              </slot>
            </q-card-section>
            <q-separator />
            <q-list dense>
              <q-item
                v-for="col in props.cols.filter((col) => col.name !== 'desc')"
                :key="col.name"
              >
                <q-item-section>
                  <q-item-label>{{ col.label }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label caption>{{ col.value }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </div>
      </template>
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
        </q-tr>
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
