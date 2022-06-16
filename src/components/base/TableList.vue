<script setup lang="ts">

interface Header {
  value: string;
  text: string;
}
interface Props { 
  items: Array<Object>;
  headers: Header[];
}
defineProps<Props>();
</script>
<template>
  <v-table>
    <thead>
      <tr>
        <th v-for="item in headers" :key="item.value">{{ item.text }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in items" :key="index">
        <td v-for="(header, headerIndex) in headers" :key="headerIndex">
          {{ item[header.value] }}
        </td>
      </tr>
    </tbody>
  </v-table>
</template>
