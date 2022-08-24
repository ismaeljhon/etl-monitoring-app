<template>
  <q-btn @click="executeClick">
    {{ `${type} ${todo}` }}
  </q-btn>
</template>

<script setup lang="ts">
import moment from 'moment'
import SyncService from '../../services/SyncService'

interface Props {
  type?: string;
  code?: string;
  todo: string;
}
const props = defineProps<Props>();

const executeClick = async () => {
  // 
}
</script>
