<script setup lang="ts">
import { ref } from 'vue';

const maximizedToggle = ref(true)
interface Props {
  show?: boolean
  title?: string
  body: string
}

defineProps<Props>()
</script>

<template>
  <q-dialog v-model="show" persistent :maximized="maximizedToggle" transition-show="slide-up" @hide="$emit('close')"
    transition-hide="slide-down">
    <q-card>
      <q-bar>
        <q-space />

        <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
          <q-tooltip v-if="maximizedToggle" class="bg-white text-primary">Minimize</q-tooltip>
        </q-btn>
        <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
          <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary">Maximize</q-tooltip>
        </q-btn>
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section>
        <slot name="title">
          <div class="text-h6" v-text="title"></div>
        </slot>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <pre>
          {{body}}
        </pre>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<style>
pre {
  white-space: pre-line;
}
</style>
