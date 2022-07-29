<template>
  <div>
    <div class="column items-center">
      <slot name="title" />
    </div>
    <q-circular-progress
      show-value
      font-size="12px"
      :value="value"
      size="150px"
      :thickness="0.22"
      color="teal"
      track-color="grey-3"
      class="q-ma-md"
    >
      {{ value }}%
    </q-circular-progress>
  </div>
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
