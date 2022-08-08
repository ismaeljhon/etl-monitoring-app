<script setup lang="ts">
import TableList from "../components/base/TableList.vue";
import BaseProgress from "../components/base/Progress.vue";

import { ref } from "vue";
import DatePicker from "./base/DatePicker.vue";

let date = ref("2019/02/01");
const headers = [
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

const items = [
  { title: "R00", body: "Ongoing", date: "date" },
  { title: "R00", body: "Done", date: "date" },
];
</script>
<template>
  <div class="q-pa-md">
    <q-card class="q-pa-md">
      <div class="row justify-center">
        <div class="col-sm-12 col-lg-4">
          <div class="column items-center">
            <q-card-section>
              <div class="text-h6">Overall ETL Monitored</div>
              <DatePicker></DatePicker>
            </q-card-section>
            <q-separator inset />
            <q-card-section>
              <div class="col">
                <BaseProgress>
                  <template #title>
                    <div>Completed ETLs</div>
                  </template>
                </BaseProgress>
              </div>
              <div class="col">
                <BaseProgress>
                  <template #title>
                    <div>Ongoing ETLs</div>
                  </template>
                </BaseProgress>
              </div>
            </q-card-section>
          </div>
        </div>
        <div class="col-sm-12 col-lg-8">
          <TableList
            title="Latest ETL Logs"
            :rows="items"
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
