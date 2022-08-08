<script setup lang="ts">
import { reactive } from "vue";
import BaseButton from "../components/base/Button.vue";
import BaseProgress from "../components/base/Progress.vue";
import BaseLinearProgress from "../components/base/LinearProgress.vue";
import TableList from "../components/base/TableList.vue";
import { capitalize } from "../utils/utils";

const modules = reactive([
  "Product Data",
  "Rankings",
  "Listings",
  "Compliance",
  "BuyBox",
  "SDA",
  "Aggresivity",
  "Scores",
  "Custom Filter",
]);
const headers = [
  { name: "date", align: "center", label: "Date", field: "date" },
  { name: "requester", align: "center", label: "Requester", field: "requester" },
  { name: "status", align: "center", label: "Status", field: "status" },
  { name: "details", align: "center", label: "Details", field: "details" },
];
const items = [
  { date: "date", requester: "John Doe", status: "Ongoing" },
  { date: "date", requester: "John Doe", status: "Done" },
  { date: "date", requester: "John Doe", status: "Ongoing" },
  { date: "date", requester: "John Doe", status: "Done" },
  { date: "date", requester: "John Doe", status: "Ongoing" },
];
</script>

<template>
  <q-card>
    <div class="q-pa-lg">
      <div class="row">
        <div class="col">
          <div class="float-left q-ma-lg">
            <div class="text-h6">
              {{ capitalize($route.params.code.toString()) }}
            </div>
          </div>
          <div class="float-right q-ma-lg">
            <BaseButton :title="'NEW ETL REQUEST'" />
          </div>
        </div>
      </div>

      <div class="row justify-center">
        <div class="col-12 col-lg-4 column items-center">
          <BaseProgress>
            <template #title>
              <div>Ongoing ETLs</div>
            </template>
          </BaseProgress>
        </div>
        <div class="col-12 col-lg-4 column items-center">
          <BaseProgress>
            <template #title>
              <div>Ongoing ETLs</div>
            </template>
          </BaseProgress>
        </div>
      </div>

      <div class="row justify-center">
        <div v-for="item in modules" class="col-12 col-lg-3 q-ma-md">
          <q-card bordered class="my-card">
            <q-card-section>
              <div class="text-h6">{{ item }}</div>
            </q-card-section>
            <BaseLinearProgress :progress="50 / 100"></BaseLinearProgress>
          </q-card>
        </div>
      </div>
    </div>
  </q-card>
  <q-card class="q-mt-md q-pa-lg">
    <TableList
      title="Latest ETL Logs"
      :rows="items"
      :columns="headers"
      :refresh="false"
      :search="true"
      :pagination="true"
    ></TableList>
  </q-card>
</template>
