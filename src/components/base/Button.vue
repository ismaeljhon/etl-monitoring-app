<template>
  <q-btn>
    {{ title }}
  </q-btn>
</template>

<script setup lang="ts">
interface Props {
  title?: string;
}
defineProps<Props>();
</script>
