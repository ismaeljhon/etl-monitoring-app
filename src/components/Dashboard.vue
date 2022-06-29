<script setup lang="ts">
import TableList from "./base/TableList.vue";

const headers = [
  { value: "id", text: "ID" },
  { value: "title", text: "Title" },
  { value: "body", text: "Body" },
];

const items = [
  { company: "R00", status: "Ongoing", date: "date" },
  { company: "R00", status: "Done", date: "date" },
];
</script>
<template>
  <v-card class="pa-10">
    <v-row>
      <v-col cols="12" lg="4">
        <v-row>
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
            <div class="text-h4">circles</div>
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
