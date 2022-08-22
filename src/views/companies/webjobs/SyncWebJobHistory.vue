<script setup lang="ts">
import { onMounted, ref } from "vue";
import TableList from "../../../components/base/TableList.vue";
import { useRoute, useRouter } from "vue-router";
import { syncListColumns } from "../../../composables/TableColumns";

import SyncService from "../../../services/SyncService";
import Alert from "../../../components/base/Alert.vue";
import { WebJobRun } from "../../../interfaces/webjob.interface";
import TextModal from "../../../components/base/TextModal.vue";
import Date from "../../../components/base/Date.vue";

// declarations
const runs = ref<WebJobRun[]>([]);
const route = useRoute();
const router = useRouter();
const alert = ref();
const outTextFileContent = ref<string>("");
const webJobName = route.params.webjob_name.toString();
const isLoadingTable = ref(false)
const outputModal = ref()
const showTextModal = ref(false)
const showOutput = async (row: WebJobRun) => {
  outTextFileContent.value = await new SyncService().getOutput(row.output_url);
  showTextModal.value = true
  outputModal.value.title = `Webjob: ${row.job_name}`
};

const getWebJobRuns = async () => {
  isLoadingTable.value = true
  runs.value = await new SyncService().getHistory(webJobName);
  isLoadingTable.value = false
}

// hooks
onMounted(() => {
  getWebJobRuns()
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
  <TableList class="q-ma-md" row-key="name" :columns="syncListColumns" :loading="isLoadingTable" :rows="runs"
    :title="`Web Job: ${webJobName}`" @refresh="getWebJobRuns()">
    <template #start_time="{ row }">
      <Date :datetime="row.start_time" format="MMMM D, YYYY hh:mm A" />
    </template>
    <template #end_time="{ row }">
      <Date :datetime="row.end_time" format="MMMM D, YYYY hh:mm A" />
    </template>
    <template #actions="{ row }">
      <q-btn size="sm" flat color="primary" @click.prevent="showOutput(row)">
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
  <TextModal title="Webjob" ref="outputModal" :show="showTextModal" :body="outTextFileContent" />
</template>
