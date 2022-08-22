<script setup lang="ts">
import { date } from "quasar";

interface Props {
  datetime: string;
  format?: string;
}
defineProps<Props>();
</script>

<template>
  <div>
    {{ date.formatDate(datetime, format) }}
  </div>
</template>
