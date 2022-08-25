<script setup lang="ts">
import { date } from "quasar";

interface Props {
  datetime: string;
  format?: string;
}
withDefaults(defineProps<Props>(), { format: "MMMM D, YYYY hh:mm A" });
</script>

<template>
  <span>
    {{
      datetime === "0001-01-01T00:00:00"
        ? "-"
        : date.formatDate(datetime, format)
    }}
  </span>
</template>