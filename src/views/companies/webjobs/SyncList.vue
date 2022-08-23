<script setup lang="ts">
import { onMounted, ref } from "vue";
import TableList from "../../../components/base/TableList.vue";
import { WebJob } from "../../../interfaces/webjob.interface";
import SyncService from "../../../services/SyncService";
import { useRoute, useRouter } from "vue-router";
import { companySyncColumns } from "../../../composables/TableColumns";

const webjobs = ref<WebJob[]>([]);
const route = useRoute();
const router = useRouter();
const companyCode = ref<string>(route.params.company_code.toString());

const refreshTable = async () => {
  webjobs.value = await new SyncService().getList({
    company_code: companyCode.value,
    refresh: true,
  });
};
onMounted(async () => {
  webjobs.value = await new SyncService().getList({
    company_code: companyCode.value,
  });
});
</script>

<template>
  <div class="row">
    <div class="col col-12">
      <div class="q-ma-lg float-left">
        <q-btn
          icon="keyboard_double_arrow_left"
          @click.prevent="router.push({ name: 'Home' })"
          >Back To Companies</q-btn
        >
      </div>
    </div>
    <div class="col col-12">
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
            color="info"
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
  </div>
</template>
