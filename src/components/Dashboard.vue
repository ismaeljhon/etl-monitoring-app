<script setup lang="ts">
import TableList from "./base/TableList.vue";
import BaseProgress from "./base/Progress.vue";

const headers = [
  { value: "id", text: "ID" },
  { value: "title", text: "Title" },
  { value: "body", text: "Body" },
];

const items = [
  { title: "R00", body: "Ongoing", date: "date" },
  { title: "R00", body: "Done", date: "date" },
];
</script>
<template>
  <v-card class="pa-10">
    <v-row>
      <v-col cols="12" lg="4">
        <v-row justify="">
          <v-col cols="12">
            <div class="text-h6 float-left">Overall ETL Monitored</div>
            <div class="float-right">
              <v-btn
                icon="mdi-cached"
                color="success"
                variant="text"
                size="small"
              ></v-btn>
            </div>
          </v-col>
          <v-col cols="12">
            <div class="text-h6"> date picker </div>
          </v-col>
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
      </v-col>
      <v-col cols="12" lg="8">
        <TableList :refresh="true" :items="items" :headers="headers">
          <template #top-left>
            <div class="text-h6">Latest ETL Logs</div>
          </template>
        </TableList>
      </v-col>
    </v-row>
  </v-card>
</template>
