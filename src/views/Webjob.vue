<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import BaseButton from "../components/base/Button.vue";
import TableList from "../components/base/TableList.vue";
import Modal from "../components/base/Modal.vue";
import { capitalize } from "../utils/utils";
import { useRoute } from "vue-router";
import { WebJob, WebJobRun } from "../interfaces/webjob.interface";
import { date } from "quasar";

import SyncService from "../services/SyncService";
import Alert from "../components/base/Alert.vue";

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
  {
    name: "actions",
    align: "center",
    label: "Actions",
    field: "action",
  },
];
const runs = ref([]);
const route = useRoute();
const alert = ref();
const dialog = ref();

// methods
const fetchOutput = async (runs) => {
  runs.map((run) => {
    new SyncService().getOutput(run.output_url).then((res) => {
      run.output = res;
    });
    return run;
  });
};

const confirmRequest = () => {
  alert.value.toggleAlert();
};

const toggleOutput = (output) => {
  dialog.value.toggle(output);
};

// hooks
onMounted(async () => {
  const res = await new SyncService().getHistory(route.params.name.toString());
  runs.value = res.runs;

  await fetchOutput(runs.value);
});
</script>

<template>
  <div class="row">
    <div class="col col-12">
      <div class="float-left q-ma-lg">
        <div class="text-h6" v-if="$route.params.name">
          {{ $route.params.name.toString() }}
        </div>
      </div>
    </div>
    <div
      class="col col-12"
      v-if="route.params.name.toString().includes('SYNC')"
    >
      <div :class="$q.screen.lt.md ? '' : 'float-right q-mt-lg q-mr-lg'">
        <q-btn
          :class="$q.screen.lt.md ? 'full-width' : 'q-mx-md'"
          @click="confirmRequest"
        >
          Sync Request
        </q-btn>
      </div>
    </div>
  </div>
  <TableList
    title="Runs"
    :rows="runs"
    :columns="headers"
    :output="true"
    row-key="name"
  >
    <template #start_time="row">
      {{ date.formatDate(row.obj.start_time, "MMMM D, YYYY hh:mm:ssA") }}
    </template>
    <template #end_time="row">
      {{ date.formatDate(row.obj.end_time, "MMMM D, YYYY hh:mm:ssA") }}
    </template>
    <template #actions="row">
      <q-btn
        size="sm"
        flat
        color="primary"
        @click="toggleOutput(row.obj.output)"
      >
        Output
      </q-btn>
    </template>
    <template #status="row">
      <q-badge :color="row.obj.status === 'Success' ? 'green' : 'red'">
        {{ row.obj.status }}
      </q-badge>
    </template>
  </TableList>
  <Alert ref="alert" />
  <Modal ref="dialog" :maximized="true" />
</template>
