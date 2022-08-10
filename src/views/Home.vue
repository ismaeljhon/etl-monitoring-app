<template>
  <div>
    <div class="row">
      <div class="col">
        <TableList
          title="Companies"
          :rows="posts"
          :columns="columns"
          :refresh="false"
          :search="true"
          :pagination="true"
        ></TableList>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <Dashboard :syncs="webjobsEtls" :etls="webjobsSyncs"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Post } from '../interfaces/post.interface'
import { WebJob, WebJobRun } from '../interfaces/webjob.interface'
import TableList from "../components/base/TableList.vue";
import EtlService from "../services/EtlService";
import SyncService from "../services/SyncService";
import Dashboard from "../components/Dashboard.vue";

const columns = [
  {
    name: "id",
    align: "center",
    label: "ID",
    field: "id",
    sortable: true,
  },
  {
    name: "title",
    align: "center",
    label: "Title",
    field: "title",
    sortable: true,
  },
  { name: "body", align: "center", label: "Body", field: "body" },
];

const posts = ref<Post[]>([]);
const webjobsEtls = ref<WebJob[]>([]);
const webjobsSyncs = ref<WebJob[]>([]);
(async () => {
  webjobsEtls.value = await new EtlService().getList();
  webjobsSyncs.value = await new SyncService().getList();
})();
</script>
