<template>
  <slot name="title" />
  <v-progress-circular
    :rotate="360"
    :size="100"
    :width="15"
    :model-value="value"
    color="teal"
    class="ma-2"
  >
    {{ value }}
  </v-progress-circular>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

let interval = {};
let value = 0;
onMounted(() => {
  interval = setInterval(() => {
    if (value === 100) {
      return (value = 0);
    }
    value += 10;
  }, 1000);
});
</script>
