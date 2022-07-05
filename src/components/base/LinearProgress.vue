<template>
  <slot name="title" />
  <v-progress-linear v-model="value" color="blue" height="25">
    <template v-slot:default="{ value }">
      <strong>{{ Math.ceil(value) }}%</strong>
    </template>
  </v-progress-linear>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

let interval = {};
let value = 50;
onMounted(() => {
  interval = setInterval(() => {
    if (value === 100) {
      return (value = 0);
    }
    value += 10;
  }, 1000);
});
</script>
