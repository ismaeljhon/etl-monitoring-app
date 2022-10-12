<script setup lang="ts">
import { useRouter } from "vue-router";

interface Props {
  msg?: {
    success?: boolean;
    msg?: string;
    dir?: string;
  };
}
const router = useRouter();
defineProps<Props>();
defineEmits(["hide"]);
</script>

<template>
  <div class="q-mt-sm">
    <q-banner
      dense
      inline-actions
      class="text-white"
      :class="msg?.success ? 'bg-green' : 'bg-red'"
    >
      {{ `${msg?.msg}. Webjob: ${ msg?.dir }` }} 
      <template v-slot:action>
        <q-btn flat color="white" label="Check Webjob" @click.prevent="router.push(`etl/${msg?.dir}`)" />
        <q-btn flat color="white" label="Close" @click="$emit('hide')" />
      </template>
    </q-banner>
  </div>
</template>
