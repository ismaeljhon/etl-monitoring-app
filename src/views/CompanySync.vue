<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import BaseButton from "../components/base/Button.vue";
import TableList from "../components/base/TableList.vue";
import Modal from "../components/base/Modal.vue";
import { capitalize } from "../utils/utils";
import { useRoute } from "vue-router";
import { WebJob, WebJobRun } from "../interfaces/webjob.interface";

import SyncService from "../services/SyncService";
import Alert from "../components/base/Alert.vue";

const headers = [
  {
    name: "name",
    align: "center",
    label: "Name",
    field: "name",
    sortable: true,
  },
  {
    name: "start_time",
    align: "center",
    label: "Start Time",
    field: "start_time",
    sortable: true,
  },
  {
    name: "end_time",
    align: "center",
    label: "End Time",
    field: "end_time",
  },
  {
    name: "status",
    align: "center",
    label: "Status",
    field: "status",
  },
];
const runs = ref([]);
const route = useRoute();
const alert = ref()

const fetchOutput = async (runs) => {
  runs.map(run => {
    new SyncService().getOutput(run.output_url)
      .then(res => {
        run.output = res
      })
    return run  
  })
}

const confirmRequest = () => {
  alert.value.toggleAlert()
}

onMounted(async () => {
  const res = await new SyncService().getHistory(route.params.name.toString());
  runs.value = res.runs;

  await fetchOutput(runs.value)
});
</script>

<template>
  <q-card>
    <div>
      <div class="row">
        <div class="col">
          <div class="float-left q-ma-lg">
            <div class="text-h6" v-if="$route.params.name">
              {{ $route.params.name.toString() }}
            </div>
          </div>
          <div class="float-right q-mt-lg q-mr-lg">
            <q-btn class="q-mx-md" @click="confirmRequest"> Sync Request </q-btn>
          </div>
        </div>
      </div>
      <TableList
        title="Runs"
        :rows="runs"
        :columns="headers"
        :output="true"
        row-key="name"
      ></TableList>
    </div>
    <Alert ref="alert"/>
  </q-card>
</template>
