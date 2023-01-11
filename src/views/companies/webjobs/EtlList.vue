<script setup lang="ts">
import { onMounted, ref } from "vue";
import TableList from "../../../components/base/TableList.vue";
import MessageBanner from "../../../components/base/MessageBanner.vue";
import { WebJob } from "../../../interfaces/webjob.interface";
import EtlService from "../../../services/EtlService";
import { useRoute, useRouter } from "vue-router";
import { companyEtlColumns } from "../../../composables/TableColumns";
import { showNotif } from "../../../composables/Notify";
import LatestRun from "../../../components/base/LatestRun.vue";
import RequestModal from "../../../components/base/RequestModal.vue";
import EvaluateEtlApiService from "../../../services/EvaluateEtlApiService";

const webjobs = ref<WebJob[]>([]);
const route = useRoute();
const router = useRouter();
const companyCode = ref<string>(route.params.company_code.toString());
const requestModal = ref();
const dataRequest = ref();
const msg = ref();
const show = ref(false);
const isLoadingRequest = ref(false);
const isLoadingTable = ref(false);
const disabled = ref(true);

const refreshTable = async () => {
  isLoadingTable.value = true
  webjobs.value = await new EtlService().getList({
    company_code: companyCode.value,
    refresh: true,
  });
  isLoadingTable.value = false
};


const triggerEtlRequest = async () => {
  isLoadingRequest.value = true;
  try {
    const resp = await new EvaluateEtlApiService().triggerEtl(dataRequest.value);
    msg.value = resp;
    showNotif(companyCode.value, msg);
    refreshTable();
  } catch (e) {
    console.log(e);
    showNotif(companyCode, msg);
  }
  isLoadingRequest.value = false;
  requestModal.value.closeModal();
};

const data = (data) => {
  dataRequest.value = data;
  disabled.value = data.code && data.date ? false : true;
};

const hideBanner = () => {
  show.value = false;
};

onMounted(async () => {
  isLoadingTable.value = true
  webjobs.value = await new EtlService().getList({
    company_code: companyCode.value,
    refresh: true
  });
  isLoadingTable.value = false
});
</script>

<template>
  <div class="row">
    <div class="col col-12">
      <div class="q-ma-lg float-left">
        <q-btn icon="keyboard_double_arrow_left" @click.prevent="router.push({ name: 'CompanyList' })">Back To
          list</q-btn>
      </div>
      <div class="q-mt-lg" :class="$q.screen.lt.md ? '' : 'float-right'">
        <q-btn color="primary" icon="add" :class="$q.screen.lt.md ? '' : 'q-mx-md'" @click="requestModal.show = true">
          ETL Request
        </q-btn>
      </div>
    </div>
  </div>
  <div class="row justify-center" v-if="msg && show">
    <div class="col col-lg-6 col-sm-12 col-xs-12">
      <MessageBanner :msg="msg" @hide="hideBanner" />
    </div>
  </div>
  <div class="row">
    <div class="col col-12">
      <TableList class="q-ma-lg" :loading="isLoadingTable" :title="`${companyCode} ETL Webjobs`" :rows="webjobs" :columns="companyEtlColumns"
        :has-actions="true" row-key="name" @refresh="refreshTable">
        <template #actions="{ row }">
          <q-btn size="sm" flat color="info" @click.prevent="router.push(`etl/${row.name}`)">
            Details
          </q-btn>
        </template>
        <template #latest_run="{ row }">
          <LatestRun v-if="row.latest_run" :latest_run="row.latest_run"></LatestRun>
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
          <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 grid-style-transition">
            <q-card>
              <q-card-section>
                <div class="row">
                  <div class="col-auto">
                    <b>{{ items.row.name }}</b>
                  </div>
                  <div class="col-auto">
                    <q-btn size="sm" flat color="info" @click.prevent="router.push(`etl/${items.row.name}`)">
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
                    <LatestRun v-if="items.row.latest_run" :latest_run="items.row.latest_run"></LatestRun>
                    <span v-else>-</span>
                  </q-item-label>
                </q-item-section>
              </q-card-section>
            </q-card>
          </div>
        </template>
      </TableList>
    </div>
  </div>
  <RequestModal type="etl" ref="requestModal" @data="data">
    <template #footer-btns>
      <q-btn label="Cancel" v-close-popup v-show="!isLoadingRequest" />
      <q-btn color="primary" :disabled="disabled" label="Confirm" @click.prevent="triggerEtlRequest"
        :loading="isLoadingRequest" />
    </template>
  </RequestModal>
</template>
