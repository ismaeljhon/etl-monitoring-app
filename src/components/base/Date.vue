<script setup lang="ts">
import { date } from "quasar";

interface Props {
  datetime: string;
  format?: string;
}
withDefaults(defineProps<Props>(), { format: "MMMM D, YYYY hh:mm A" });
</script>

<template>
  <div>
    {{ date.formatDate(datetime, format) }}
  </div>
</template>
