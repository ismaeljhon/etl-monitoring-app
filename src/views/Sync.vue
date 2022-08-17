<script setup lang="ts">
import { ref } from "vue";
import TableList from "../components/base/TableList.vue";

import { WebJob } from "../interfaces/webjob.interface";

import SyncService from "../services/SyncService";

const headers = [
  {
    name: "name",
    align: "center",
    label: "Name",
    field: "name",
    sortable: true,
  },
  {
    name: "type",
    align: "center",
    label: "Type",
    field: "type",
    sortable: true,
  },
  {
    name: "using_sdk",
    align: "center",
    label: "SDK",
    field: "using_sdk",
  },
  {
    name: "run_command",
    align: "center",
    label: "Run Command",
    field: "run_command",
  },
];
const webjobs = ref<WebJob[]>([]);
(async () => {
  webjobs.value = await new SyncService().getList();
})();

const refreshTable = async () => {
  webjobs.value = await new SyncService().getList({ refresh: true });
};
</script>

<template>
  <div>
    <div class="row">
      <div class="col">
        <div class="float-right q-pa-md">
          <q-btn type="primary" @click="refreshTable">Refresh</q-btn>
        </div>
      </div>
    </div>
    <TableList
      title="Sync WebJobs"
      :rows="webjobs"
      :columns="headers"
      :has-actions="true"
      row-key="name"
    ></TableList>
  </div>
</template>
