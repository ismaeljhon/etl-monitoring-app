<script setup lang="ts">
import { onMounted, ref } from "vue";
import TableList from "../../../components/base/TableList.vue";
import { WebJob } from "../../../interfaces/webjob.interface";
import EtlService from "../../../services/EtlService";
import { useRoute, useRouter } from "vue-router";
import { companyEtlColumns } from "../../../composables/TableColumns";
import LatestRun from "../../../components/base/LatestRun.vue";
import RequestModal from "../../../components/base/RequestModal.vue";

const webjobs = ref<WebJob[]>([]);
const route = useRoute();
const router = useRouter();
const companyCode = ref<string>(route.params.company_code.toString());
const requestModal = ref();
const dataRequest = ref();
const isLoadingRequest = ref(false);

const refreshTable = async () => {
  webjobs.value = await new EtlService().getList({
    company_code: companyCode.value,
    refresh: true,
  });
};

const triggerEtlRequest = async () => {
  isLoadingRequest.value = true;
  console.log('etl trigger', dataRequest)
  isLoadingRequest.value = false;
  requestModal.value.closeModal();
};

const data = (data) => {
  dataRequest.value = data
};

onMounted(async () => {
  webjobs.value = await new EtlService().getList({
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
      <div class="q-mt-lg float-right">
        <q-btn
          color="primary"
          icon="add"
          :class="$q.screen.lt.md ? 'full-width' : 'q-mx-md'"
          @click="requestModal.show = true"
        >
          ETL Request
        </q-btn>
      </div>
    </div>
    <div class="col col-12">
      <TableList
        class="q-ma-lg"
        :title="`${companyCode} ETL Webjobs`"
        :rows="webjobs"
        :columns="companyEtlColumns"
        :has-actions="true"
        row-key="name"
        @refresh="refreshTable"
      >
        <template #actions="{ row }">
          <q-btn
            size="sm"
            flat
            color="info"
            @click.prevent="router.push(`etl/${row.name}`)"
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
      </TableList>
    </div>
  </div>
  <RequestModal type="etl" ref="requestModal" @data="data">
    <template #footer-btns>
      <q-btn label="Cancel" v-close-popup v-show="!isLoadingRequest" />
      <q-btn
        color="primary"
        label="Confirm"
        @click.prevent="triggerEtlRequest"
        :loading="isLoadingRequest"
      />
    </template>
  </RequestModal>
</template>