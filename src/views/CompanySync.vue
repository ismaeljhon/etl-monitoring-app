<script setup lang="ts">
import { onMounted, ref } from "vue";
import TableList from "../components/base/TableList.vue";
import { WebJob } from "../interfaces/webjob.interface";
import SyncService from "../services/SyncService";
import { useRoute } from "vue-router";
import { companySyncColumns } from '../composables/TableColumns'

const webjobs = ref<WebJob[]>([]);
const route = useRoute()
const companyCode = ref<string>(route.params.company_code.toString())

const refreshTable = async () => {
  webjobs.value = await new SyncService().getList({ company_code: companyCode.value, refresh: true });
};

onMounted(async () => {
  webjobs.value = await new SyncService().getList({ company_code: companyCode.value });
});
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
    <TableList title="Sync WebJobs" :rows="webjobs" :columns="companySyncColumns" :has-actions="true" row-key="name">
      <template #actions="{ row }">
        <q-btn size="sm" flat color="primary" :href="`/companies/${companyCode}/webjobs/sync/${row.name}`">
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
