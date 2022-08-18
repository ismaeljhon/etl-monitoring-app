<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import TableList from "../../../components/base/TableList.vue";
import RequestModal from "../../../components/base/RequestModal.vue";
import EtlService from "../../../services/EtlService";
import { WebJob } from "../../../interfaces/webjob.interface";

const headers = [
  {
    name: "name",
    align: "center",
    label: "Name",
    field: "name",
    sortable: true,
  },
  {
    name: "start_time",
    align: "center",
    label: "Start Time",
    field: "start_time",
    sortable: true,
  },
  {
    name: "end_time",
    align: "center",
    label: "End Time",
    field: "end_time",
  },
  {
    name: "status",
    align: "center",
    label: "Status",
    field: "status",
  },
];

// declarations
const route = useRoute();
const webjobs = ref<WebJob[]>([]);
const request = ref()

// methods
const fetchRuns = async () => {
  const res = await new EtlService().getList();
  webjobs.value = res.filter((item) =>
    item.name.includes(route.params.code.toString())
  );
};

const openRequest = () => {
  request.value.toggleRequest(route.params.company_code)
}

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
          <q-btn :class="$q.screen.lt.md ? 'full-width' : 'q-mx-md'" @click="openRequest">
            ETL Request
          </q-btn>
        </div>
      </div>
    </div>
    <TableList :title="`${route.params.company_code} ETL Webjobs`" :rows="webjobs" :columns="headers"
      :has-actions="true" row-key="name"></TableList>
    <RequestModal ref="request" />
  </div>
</template>
