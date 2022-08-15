<script setup lang="ts">
import { reactive, ref } from "vue";
import BaseButton from "../components/base/Button.vue";
import TableList from "../components/base/TableList.vue";
import Modal from "../components/base/Modal.vue";
import { capitalize } from "../utils/utils";

import { WebJob, WebJobRun } from "../interfaces/webjob.interface";

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
    name: "run_command",
    align: "center",
    label: "Run Command",
    field: "run_command",
  },
];
const webjobs = ref<WebJob[]>([]);
(async () => {
  webjobs.value = await new SyncService().getList();
  console.log(webjobs);
})();

const refreshTable = async () => {
  webjobs.value = await new SyncService().getList({ refresh: true });
};

</script>

<template>
  <q-card>
    <div>
      <div class="row">
        <div class="col">
          <div class="float-left q-ma-lg">
            <!-- <div class="text-h6" v-if="$route.params.code">
              {{ capitalize($route.params.code.toString()) }}
            </div> -->
          </div>
          <div class="float-right q-mt-lg q-mr-lg">
            
            <q-btn type="primary" @click="refreshTable">Refresh</q-btn>
            <q-btn class="q-mx-md" @click=""> Sync Request </q-btn>
            <!-- <Modal
              :type="'sync'"
              :todo="'request'"
            /> -->
          </div>
        </div>
      </div>
      <TableList
        title="Sync WebJobs"
        :rows="webjobs"
        :columns="headers"
        :refresh="false"
        :search="true"
        :pagination="true"
      ></TableList>
    </div>
  </q-card>
</template>
