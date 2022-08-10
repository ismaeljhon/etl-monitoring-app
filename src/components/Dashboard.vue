<script setup lang="ts">
import TableList from "../components/base/TableList.vue";
import BaseProgress from "../components/base/Progress.vue";

import { ref } from "vue";
import DatePicker from "./base/DatePicker.vue";

interface Props {
  syncs: Array<Object>;
  etls: Array<Object>;
}

let date = ref("2019/02/01");
const headers = [
  {
    name: "name",
    align: "center",
    label: "Name",
    field: "name",
    sortable: true,
  },
  {
    name: "type",
    align: "center",
    label: "Type",
    field: "type",
    sortable: true,
  },
  {
    name: "run_command",
    align: "center",
    label: "Run Command",
    field: "run_command",
  },
];

const props = defineProps<Props>();
</script>
<template>
  <div class="q-pa-md">
    <q-card class="q-pa-md">
      <q-card-section>
        <div class="text-h6">Latest Webjobs</div>
      </q-card-section>
      <div class="row justify-center">
        <div class="col-12 col-lg-3 column items-center">
          <BaseProgress>
            <template #title>
              <div>Done ETLs</div>
            </template>
          </BaseProgress>
        </div>
        <div class="col-12 col-lg-3 column items-center">
          <BaseProgress>
            <template #title>
              <div>Ongoing ETLs</div>
            </template>
          </BaseProgress>
        </div>
        <div class="col-12 col-lg-3 column items-center">
          <BaseProgress>
            <template #title>
              <div>Done Syncs</div>
            </template>
          </BaseProgress>
        </div>
        <div class="col-12 col-lg-3 column items-center">
          <BaseProgress>
            <template #title>
              <div>Ongoing Syncs</div>
            </template>
          </BaseProgress>
        </div>
      </div>
      <div class="row justify-center">
        <div class="col-sm-12 col-lg-12">
          <TableList
            title="Latest ETL Logs"
            :rows="etls"
            :columns="headers"
            :refresh="false"
            :search="true"
            :pagination="true"
          ></TableList>
        </div>
        <div class="col-sm-12 col-lg-12">
          <TableList
            title="Latest Sync Logs"
            :rows="syncs"
            :columns="headers"
            :refresh="false"
            :search="true"
            :pagination="true"
          ></TableList>
        </div>
      </div>
    </q-card>
  </div>
</template>
