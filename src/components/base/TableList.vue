<script setup lang="ts">
import { reactive, ref } from "vue";

interface Header {
  value: string;
  text: string;
}
interface Props {
  items: Array<Object>;
  headers: Header[];
}
defineProps<Props>();

const page = ref(1);
const filter = reactive({
  search: "",
});
</script>
<template>
  <v-row>
    <v-col>
      <slot name="top-left"> </slot>
    </v-col>
    <v-col>
      <slot name="top-middle">
        <v-text-field v-model="filter.search" label="Search"></v-text-field>
      </slot>
    </v-col>
    <v-col>
      <slot name="top-right">
        <v-pagination v-model="page" :length="6"></v-pagination>
      </slot>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-table>
        <thead>
          <tr>
            <th v-for="item in headers" :key="item.value">{{ item.text }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="index">
            <td v-for="(header, headerIndex) in headers" :key="headerIndex">
              <slot :name="header.value">
                {{ item[header.value] }}
              </slot>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <slot name="botton-left"></slot>
    </v-col>
    <v-col>
      <slot name="botton-middle"></slot>
    </v-col>
    <v-col>
      <slot name="botton-right">
        <v-pagination v-model="page" :length="6"></v-pagination>
      </slot>
    </v-col>
  </v-row>
</template>
