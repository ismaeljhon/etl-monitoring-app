<template>
  <div class="q-pa-md">
    <q-linear-progress stripe size="10px" :value="progress" />
  </div>
</template>

<script setup lang="ts">
interface Props {
  progress?: number;
}
defineProps<Props>();
</script>