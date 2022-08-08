<script setup lang="ts">
import { reactive, ref } from "vue";

interface Header {
  value: string;
  text: string;
}
interface Props {
  title: string;
  rows: Array<Object>;
  columns: Array<Object>;
  refresh?: Boolean;
  pagination?: Boolean;
  search?: Boolean;
}
defineProps<Props>();
const page = ref(1);
const filter = reactive({
  search: "",
});
</script>
<template>
  <div class="q-pa-md">
    <q-table
      :grid="$q.screen.lt.sm"
      :title="title"
      :columns="columns"
      :rows="rows"
      row-key="name"
    />
  </div>
</template>
