<script setup lang="ts">
import { onMounted, ref } from "vue";
import TableList from "../components/base/TableList.vue";
import { WebJob, WebJobRun } from "../interfaces/webjob.interface";
import SyncService from "../services/SyncService";
import { useRoute, useRouter } from "vue-router";
import { companySyncColumns } from "../composables/TableColumns";
import LatestRun from "../components/LatestRun.vue";

const webjobs = ref<WebJob[]>([]);
const route = useRoute();
const router = useRouter();
const companyCode = ref<string>(route.params.company_code.toString());
const latestRun = ref();
const output = ref("");

const refreshTable = async () => {
  webjobs.value = await new SyncService().getList({
    company_code: companyCode.value,
    refresh: true,
  });
};

const fetchOutput = async (url) => {
  new SyncService().getOutput(url).then((res) => {
    output.value = res;
  });
};

const refreshLatest = async () => {
  webjobs.value = await new SyncService().getList({
    company_code: companyCode.value,
  });
  fetchOutput(webjobs.value[0].latest_run?.output_url);
  latestRun.value = webjobs.value[0].latest_run;
};

onMounted(async () => {
  webjobs.value = await new SyncService().getList({
    company_code: companyCode.value,
  });
  fetchOutput(webjobs.value[0].latest_run?.output_url);
  latestRun.value = webjobs.value[0].latest_run;
});
</script>

<template>
  <div>
    <LatestRun :latest-run="latestRun" :output="output" @refresh="refreshLatest">
      <template #company>
        {{ route.params?.company_code }}
      </template>
    </LatestRun>
    <TableList
      class="q-ma-lg"
      title="Sync WebJobs"
      :rows="webjobs"
      :columns="companySyncColumns"
      :has-actions="true"
      row-key="name"
      @refresh="refreshTable"
    >
      <template #actions="{ row }">
        <q-btn
          size="sm"
          flat
          color="primary"
          @click.prevent="router.push(`sync/${row.name}`)"
        >
          Details
        </q-btn>
      </template>
      <template #using_sdk="{ row }">
        <div class="q-pa-md">
          <div :class="row.using_sdk ? 'text-green' : 'text-red'">
            <q-icon size="md" name="check" />
          </div>
        </div>
      </template>
    </TableList>
  </div>
</template>
