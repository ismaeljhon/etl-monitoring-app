<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn @click="modal = true">
      {{ `${type} ${todo}` }}
    </q-btn>
    <q-dialog v-model="modal" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="warning" text-color="white" />
          <span class="q-ml-sm"
            >{{ `You are about to trigger ${type?.toUpperCase()} for company ${code?.toUpperCase()}.` }} </span
          >
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Continue" color="primary" @click="executeClick" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import moment from "moment";
import SyncService from '../../services/SyncService'

import { capitalize } from "../../utils/utils";

interface Props {
  type?: string;
  todo: string;
  code?: string;
}
const props = defineProps<Props>();
const modal = ref(false);

const buildParam = () => {
  const time = moment().format('HH:MM')
    .toString()
    .replace(':','')
  return `${time}-${props.code}-${props.type?.toUpperCase()}`
}

const executeClick = async () => {
  if (props.type === 'sync') {
    const name = buildParam()
    // const apiservice = await new SyncService().trigger(name)
    // console.log(apiservice)
    console.log(name)
  }
}
</script>
