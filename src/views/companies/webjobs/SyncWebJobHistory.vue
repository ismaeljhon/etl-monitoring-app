<script setup lang="ts">
import { onMounted, ref } from "vue";
import TableList from "../../../components/base/TableList.vue";
import Modal from "../../../components/base/Modal.vue";
import { useRoute, useRouter } from "vue-router";
import { date } from "quasar";
import { syncListColumns } from "../../../composables/TableColumns";

import SyncService from "../../../services/SyncService";
import Alert from "../../../components/base/Alert.vue";
import { WebJobRun } from "../../../interfaces/webjob.interface";

// declarations
const runs = ref<WebJobRun[]>([]);
const route = useRoute();
const router = useRouter();
const alert = ref();
const dialog = ref();
const outTextFileContent = ref<string>("");
const webJobName = route.params.webjob_name.toString();
const showOutput = async (url: string) => {
  outTextFileContent.value = await new SyncService().getOutput(url);
};

// hooks
onMounted(async () => {
  runs.value = await new SyncService().getHistory(webJobName);
});
</script>

<template>
  <div class="row">
    <div class="col col-12">
      <div class="q-ma-lg float-left">
        <q-btn icon="keyboard_double_arrow_left" @click.prevent="router.push({ name: 'SyncList' })">Back To list</q-btn>
      </div>
      <div class="q-mt-lg float-right">
        <q-btn color="primary" icon="add" :class="$q.screen.lt.md ? 'full-width' : 'q-mx-md'"> Sync Request </q-btn>
      </div>
    </div>
  </div>
  <TableList class="q-ma-md" :title="`Web Job: ${webJobName}`" :rows="runs" :columns="syncListColumns" row-key="name">
    <template #start_time="{ row }">
      {{ date.formatDate(row.start_time, "MMMM D, YYYY hh:mm:ss A") }}
    </template>
    <template #end_time="{ row }">
      {{ date.formatDate(row.end_time, "MMMM D, YYYY hh:mm:ss A") }}
    </template>
    <template #actions="{ row }">
      <q-btn size="sm" flat color="primary" @click.prevent="showOutput(row.output_url)">
        View logs
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
