<template>
  <v-btn variant="outlined" :class="class" :size="size" :block="block">
    <slot name="label" />
  </v-btn>
</template>

<script setup lang="ts">
interface Props {
  size?: string;
  class?: string;
  block: Boolean;
}
defineProps<Props>();
</script>
