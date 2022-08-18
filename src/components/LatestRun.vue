<template>
  <q-card class="q-pa-sm q-ma-lg q-mx-auto" flat bordered style="width: 700px">
    <q-card-section horizontal>
      <q-card-section class="q-pt-xs">
        <div class="text-h5 q-mt-sm q-mb-xs">
          Latest Run for <slot name="company">Company</slot>
        </div>
        <q-card-section>
          <div class="column col-8">
            <div class="text-subtitle2">Name: {{ latestRun?.name }}</div>
            <div class="text-subtitle2">
              Job Name: {{ latestRun?.job_name }}
            </div>
            <div class="text-subtitle2">
              Status:
              <q-badge :color="latestRun?.status === 'Success'? 'green' : 'red'">{{
                latestRun?.status
              }}</q-badge>
            </div>
          </div>
          <div class="col c0l-4">
            <div class="text-subtitle2">
              Start: {{ formatDate(latestRun?.start_time) }}
            </div>
            <div class="text-subtitle2">
              End: {{ formatDate(latestRun?.end_time) }}
            </div>
            <div class="text-subtitle2">
              Duration: {{ latestRun?.duration }}
            </div>
          </div>
        </q-card-section>
      </q-card-section>
    </q-card-section>
    <q-separator />
    <q-card-actions align="right">
      <q-btn flat color="secondary" @click="$emit('refresh')"> Refresh </q-btn>
      <q-btn flat color="primary" @click="toggleOutput"> Output </q-btn>
    </q-card-actions>
  </q-card>
  <Modal ref="dialog" />
</template>

<script setup lang="ts">
import { date } from "quasar";
import { ref } from "vue";
import { WebJobRun } from "../interfaces/webjob.interface";
import Modal from "./base/Modal.vue";

interface Props {
  latestRun?: WebJobRun;
  output?: string;
}
const dialog = ref();
const props = defineProps<Props>();
defineEmits(['refresh'])

const toggleOutput = async () => {
  dialog.value.toggle(props.output?.toString());
};

const formatDate = (datetime) => {
  return date.formatDate(datetime, "MMMM D, YYYY hh:mm:ssA");
};

</script>
