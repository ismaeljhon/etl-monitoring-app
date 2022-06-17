<script setup lang="ts">
import TableList from "./base/TableList.vue";
import { Company } from "../interfaces/company.interface";

const headers = [
  { text: "ID", value: "id" },
  { text: "Code", value: "code" },
  { text: "Name", value: "name" },
  { text: "", value: "action" },
];

const companies: Company[] = [
  { id: "1", code: "R00", name: "DevTest" },
  { id: "2", code: "R00", name: "DevTest" },
];
</script>
<template>
  <h3>Companies</h3>
  <TableList :items="companies" :headers="headers">
    <template #action>
      <v-btn>
        <v-icon icon="mdi-eye"></v-icon>
        View Details
      </v-btn>
    </template>
  </TableList>
</template>
