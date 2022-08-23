<script setup lang="ts">
import { ref } from "vue";

const maximizedToggle = ref(false);
interface Props {
  title?: string;
  body: string;
  persistent?: boolean;
  isMaximizable?: boolean;
}

const show = ref(false);
withDefaults(defineProps<Props>(), {
  persistent: false,
  title: "",
  isMaximizable: false,
});

const closeModal = () => {
  show.value = false;
};

defineExpose({
  show,
  closeModal,
});
</script>

<template>
  <q-dialog
    class="dialog"
    v-model="show"
    :persistent="persistent"
    :maximized="maximizedToggle"
    transition-show="slide-up"
    @hide="$emit('close')"
    transition-hide="slide-down"
    full-height
    full-width
  >
    <q-card>
      <q-bar>
        <q-space />

        <q-btn
          v-if="isMaximizable"
          dense
          flat
          icon="minimize"
          @click="maximizedToggle = false"
          :disable="!maximizedToggle"
        >
          <q-tooltip v-if="maximizedToggle" class="bg-white text-primary"
            >Minimize</q-tooltip
          >
        </q-btn>
        <q-btn
          v-if="isMaximizable"
          dense
          flat
          icon="crop_square"
          @click="maximizedToggle = true"
          :disable="maximizedToggle"
        >
          <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary"
            >Maximize</q-tooltip
          >
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
          {{ body }}
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
