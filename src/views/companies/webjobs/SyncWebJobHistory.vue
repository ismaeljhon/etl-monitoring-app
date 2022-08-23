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
import RequestModal from "../../../components/base/RequestModal.vue";

// declarations
const runs = ref<WebJobRun[]>([]);
const route = useRoute();
const router = useRouter();
const alert = ref();
const outTextFileContent = ref<string>("");
const webJobName = route.params.webjob_name.toString();
const companyCode = route.params.company_code
const isLoadingTable = ref(false)
const outputModal = ref()
const showOutput = async (row: WebJobRun) => {
  outTextFileContent.value = await new SyncService().getOutput(row.output_url);
  outputModal.value.show = true
};

const getWebJobRuns = async () => {
  isLoadingTable.value = true
  try {
    runs.value = await new SyncService().getHistory(webJobName);
  } catch (e) {
    console.log(e)
  }
  isLoadingTable.value = false
}

const requestModal = ref()
const isLoadingRequest = ref(false)

const triggerSyncRequest = async () => {
  isLoadingRequest.value = true
  await new SyncService().trigger(webJobName)
  isLoadingRequest.value = false
  requestModal.value.closeModal()
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
        <q-btn color="primary" icon="add" :class="$q.screen.lt.md ? 'full-width' : 'q-mx-md'"
          @click="requestModal.show = true">
          Sync Request </q-btn>
      </div>
    </div>
  </div>
  <TableList class="q-ma-md" row-key="name" :columns="syncListColumns" :loading="isLoadingTable" :rows="runs"
    :title="`Web Job: ${webJobName}`" @refresh="getWebJobRuns()">
    <template #start_time="{ row }">
      <Date :datetime="row.start_time" />
    </template>
    <template #end_time="{ row }">
      <Date :datetime="row.end_time" />
    </template>
    <template #actions="{ row }">
      <q-btn size="sm" flat color="info" @click.prevent="showOutput(row)">
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
  <TextModal :title="`Webjob: ${webJobName}`" ref="outputModal" :body="outTextFileContent" />
  <RequestModal type="sync" ref="requestModal">
    <template #body-text>
      Are you sure you want to trigger sync for company: {{ companyCode }}?
    </template>
    <template #footer-btns>
      <q-btn label="Cancel" v-close-popup v-show="!isLoadingRequest" />
      <q-btn color="primary" label="Confirm" @click.prevent="triggerSyncRequest" :loading="isLoadingRequest" />
    </template>
  </RequestModal>
</template>
