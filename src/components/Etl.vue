<script setup lang="ts">
import TableList from "./base/TableList.vue";
import BaseProgress from "./base/Progress.vue";
import BaseLinearProgress from "./base/LinearProgress.vue";
import BaseButton from "./base/Button.vue";

import { useDisplay } from "vuetify";
import { reactive } from "vue";

const { mobile } = useDisplay();
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
  { value: "date", text: "DateTime Requested" },
  { value: "requester", text: "Requested By" },
  { value: "status", text: "Status" },
  { value: "details", text: "Details" },
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
  <section>
    <v-card class="pa-4">
      <v-row justify="space-around" dense class="my-8">
        <v-col cols="12" lg="4">
          <slot name="title"></slot>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="12" lg="4">
          <BaseButton
            :block="mobile ? true : false"
            :class="mobile ? '' : 'float-right'"
          >
            <template #label> New ETL Request </template>
          </BaseButton>
        </v-col>
      </v-row>
      <v-row justify="center" class="my-8">
        <v-col cols="12" lg="6">
          <div class="text-h4 mx-auto text-center">
            <BaseProgress>
              <template #title>
                <div class="text-h6">Completed ETLs</div>
              </template>
            </BaseProgress>
          </div>
        </v-col>
        <v-col cols="12" lg="6">
          <div class="text-h4 mx-auto text-center">
            <BaseProgress>
              <template #title>
                <div class="text-h6">Ongoing ETLs</div>
              </template>
            </BaseProgress>
          </div>
        </v-col>
      </v-row>
      <v-row justify="center" class="my-8">
        <v-col v-for="item in modules" cols="12" lg="3">
          <v-card>
            <v-card-title> {{ item }} </v-card-title>
            <v-card-text>
              <BaseLinearProgress></BaseLinearProgress>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
    <v-row>
      <v-col cols="12" class="pt-10">
        <TableList
          :headers="headers"
          :items="items"
          :refresh="false"
          :search="true"
          :pagination="true"
        >
          <template #top-left>
            <div class="text-h5">Latest ETL Logs</div>
          </template>
          <template #actions>
            <a>View Details</a>
          </template>
          <template #id-mobile>
            <div class="text-h6">Title:</div>
          </template>
        </TableList>
      </v-col>
    </v-row>
  </section>
</template>
