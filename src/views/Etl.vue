<script setup lang="ts">
import { ref } from "vue";
import TableList from "../components/base/TableList.vue";

import { WebJob } from "../interfaces/webjob.interface";

import EtlService from "../services/EtlService";

// declarations
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
    name: "run_command",
    align: "center",
    label: "Run Command",
    field: "run_command",
  },
  {
    name: "actions",
    align: "center",
    label: "Actions",
    field: "",
  },
];
const webjobs = ref<WebJob[]>([]);

// methods
(async () => {
  webjobs.value = await new EtlService().getList();
})();

const refreshTable = async () => {
  webjobs.value = await new EtlService().getList({ refresh: true });
};
</script>

<template>
  <div class="row">
    <div class="col">
      <div class="float-right q-mt-lg q-mr-lg">
        <q-btn type="primary" @click="refreshTable">Refresh</q-btn>
      </div>
    </div>
  </div>
  <TableList
    title="ETL WebJobs"
    :rows="webjobs"
    :columns="headers"
    :has-actions="true"
    row-key="name"
  >
    <template #actions>
      test
    </template>
  </TableList>
</template>
