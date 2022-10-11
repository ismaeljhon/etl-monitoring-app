<script setup lang="ts">
interface Props {
  msg?: {
    success?: boolean;
    msg?: string;
    dir?: string;
  };
}
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
      {{ msg?.msg }}
      <template v-slot:action>
        <q-btn flat color="white" label="Close" @click="$emit('hide')" />
      </template>
    </q-banner>
  </div>
</template>
