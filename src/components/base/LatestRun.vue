<script setup lang="ts">
import { WebJobRun } from "../../interfaces/webjob.interface";
import Date from "./Date.vue";

interface Props {
  latest_run: Pick<WebJobRun, 'start_time' | 'end_time' | 'status'>;
}

withDefaults(defineProps<Props>(), {
  latest_run: (): Pick<WebJobRun, 'start_time' | 'end_time' | 'status'> => {
    return {
      start_time: '',
      end_time: '',
      status: ''
    }
  }
});
</script>

<template>
  <div>
    <strong>Start Date:</strong>
    <Date :datetime="latest_run.start_time" />
  </div>

  <div><strong>End Date:</strong>
    <Date :datetime="latest_run.end_time" />
  </div>
  <strong>Status: </strong>
  <q-badge :color="latest_run.status === 'Success' ? 'green' : 'red'">
    {{ latest_run.status }}
  </q-badge>
</template>