<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import TableList from "../../../components/base/TableList.vue";
import RequestModal from "../../../components/base/RequestModal.vue";
import EtlService from "../../../services/EtlService";
import { WebJob } from "../../../interfaces/webjob.interface";
import { etlListColumns } from "../../../composables/TableColumns";

// declarations
const route = useRoute();
const webjobs = ref<WebJob[]>([]);
const request = ref();

// methods
console.log(route);
const fetchRuns = async () => {
  webjobs.value = await new EtlService().getList({
    company_code: route.params.company_code.toString(),
    refresh: true,
  });
};

const openRequest = () => {
  request.value.toggleRequest(route.params.company_code);
};

// hooks
onMounted(() => {
  fetchRuns();
});
</script>
<template>
  <div>
    <div class="row">
      <div class="col col-12">
        <div :class="$q.screen.lt.md ? '' : 'float-right q-mt-lg q-mr-lg'">
          <q-btn
            :class="$q.screen.lt.md ? 'full-width' : 'q-mx-md'"
            @click="openRequest"
          >
            ETL Request
          </q-btn>
        </div>
      </div>
    </div>
    <div class="q-ma-lg">
      <TableList
        :title="`${route.params.company_code} ETL Webjobs`"
        :rows="webjobs"
        :columns="etlListColumns"
        :has-actions="true"
        row-key="name"
      ></TableList>
    </div>

    <RequestModal ref="request" />
  </div>
</template>
