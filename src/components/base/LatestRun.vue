<script setup lang="ts">
import { computed } from "@vue/reactivity";
import { WebJobRun } from "../../interfaces/webjob.interface";
import Date from "./Date.vue";

interface Props {
  latest_run: WebJobRun;
}

withDefaults(defineProps<Props>(), {});
</script>

<template>
  <div>
    <strong>Start Date:</strong> <Date :datetime="latest_run.start_time" />
  </div>

  <div><strong>End Date:</strong> <Date :datetime="latest_run.end_time" /></div>
  <strong>Status: </strong>
  <q-badge :color="latest_run.status === 'Success' ? 'green' : 'red'">
    {{ latest_run.status }}
  </q-badge>
</template>