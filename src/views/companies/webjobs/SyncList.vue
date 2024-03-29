<script setup lang="ts">
import { onMounted, ref } from "vue";
import TableList from "../../../components/base/TableList.vue";
import { WebJob } from "../../../interfaces/webjob.interface";
import SyncService from "../../../services/SyncService";
import { useRoute, useRouter } from "vue-router";
import { companySyncColumns } from "../../../composables/TableColumns";
import LatestRun from "../../../components/base/LatestRun.vue";

const webjobs = ref<WebJob[]>([]);
const route = useRoute();
const router = useRouter();
const companyCode = ref<string>(route.params.company_code.toString());
const loading = ref(false)

const refreshTable = async () => {
  loading.value = true
  webjobs.value = await new SyncService().getList({
    company_code: companyCode.value,
    refresh: true,
  });
  loading.value = false
};
onMounted(async () => {
  loading.value = true
  webjobs.value = await new SyncService().getList({
    company_code: companyCode.value,
    refresh: true
  });
  loading.value = false
});
</script>

<template>
  <div class="row">
    <div class="col col-12">
      <div class="q-ma-lg float-left">
        <q-btn
          icon="keyboard_double_arrow_left"
          @click.prevent="router.push({ name: 'CompanyList' })"
          >Back To Companies
        </q-btn>
      </div>
    </div>
    <div class="col col-12">
      <TableList
        class="q-ma-lg"
        title="Sync WebJobs"
        :rows="webjobs"
        :loading="loading"
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
        <template #latest_run="{ row }">
          <LatestRun
            v-if="row.latest_run"
            :latest_run="row.latest_run"
          ></LatestRun>
          <span v-else>-</span>
        </template>
        <template #using_sdk="{ row }">
          <div class="q-pa-md">
            <div :class="row.using_sdk ? 'text-green' : 'text-red'">
              <q-icon size="md" name="check" />
            </div>
          </div>
        </template>
        <template #custom-grid="{ items }">
          <div
            class="q-pa-xs col-xs-12 col-sm-6 col-md-4 grid-style-transition"
          >
            <q-card>
              <q-card-section>
                <div class="row">
                  <div class="col float-left">
                    <b>{{ items.row.name }}</b>
                  </div>
                  <div class="col float-right">
                    <q-btn
                      size="sm"
                      flat
                      color="info"
                      @click.prevent="router.push(`sync/${items.row.name}`)"
                    >
                      Details
                    </q-btn>
                  </div>
                </div>
              </q-card-section>
              <q-separator />
              <q-card-section>
                <q-item-section>
                  <q-item-label>
                    Latest Run:
                    <LatestRun
                      v-if="items.row.latest_run"
                      :latest_run="items.row.latest_run"
                    ></LatestRun>
                  </q-item-label>
                </q-item-section>
              </q-card-section>
            </q-card>
          </div>
        </template>
      </TableList>
    </div>
  </div>
</template>