<template>
  <div class="">
    <q-dialog
      v-model="modal"
      persistent
      :maximized="maximized"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-primary text-white">
        <q-bar>
          <q-space />

          <q-btn dense flat icon="crop_square" @click="toggleMaximized">
            <q-tooltip v-if="!maximized" class="bg-white text-primary"
              >Maximize</q-tooltip
            >
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-h6">Logs</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <pre>
            {{ item }}
          </pre>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Props {
  content?: string;
}
const props = defineProps<Props>();
const modal = ref(false);
const maximized = ref(false);
const item = ref();
const toggle = (text) => {
  item.value = modifyText(text.toString());
  if (modal.value) {
    modal.value = false;
  } else {
    modal.value = true;
  }
};

const toggleMaximized = () => {
  if (maximized.value) {
    maximized.value = false;
  } else {
    maximized.value = true;
  }
};

const modifyText = (text) => {
  const mod = text.replace(/\[(.+?)\]/g, '')
  return mod
};

defineExpose({
  toggle,
});
</script>

<style>
pre {
  white-space: pre-line;
}
</style>
