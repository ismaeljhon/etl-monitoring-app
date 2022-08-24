<script setup lang="ts">
import { ref } from "vue";
import { TextModal } from "../../interfaces/theme/modal.interface";
import SyncService from "../../services/SyncService";

const maximizedToggle = ref(false);
interface Props {
  persistent?: boolean;
  isMaximizable?: boolean;
}

const show = ref<boolean>(false);
const modalOutputUrl = ref<string>("")
const modalTitle = ref<string>("")
const modalBody = ref<string>("")
const isLoading = ref<boolean>(false)

withDefaults(defineProps<Props>(), {
  persistent: false,
  title: "",
  isMaximizable: false,
});

const closeModal = () => {
  show.value = false
  modalTitle.value = ''
  modalBody.value = ''
  isLoading.value = false
};

const showModal = (params: TextModal) => {
  const { title = '', outputUrl } = params
  show.value = true
  modalTitle.value = title
  modalOutputUrl.value = outputUrl
  getOutputText(outputUrl)
}

const getOutputText = async (outputUrl: string) => {
  modalBody.value = ''
  isLoading.value = true
  modalBody.value = await new SyncService().getOutput(outputUrl)
  isLoading.value = false
}

defineExpose({
  closeModal,
  showModal
});
</script>

<template>
  <q-dialog class="dialog" v-model="show" :persistent="persistent" :maximized="maximizedToggle"
    transition-show="slide-up" @hide="$emit('close')" transition-hide="slide-down" full-height full-width>
    <q-card>
      <q-bar>
        <q-space />

        <q-btn v-if="isMaximizable" dense flat icon="minimize" @click="maximizedToggle = false"
          :disable="!maximizedToggle">
          <q-tooltip v-if="maximizedToggle" class="bg-white text-primary">Minimize</q-tooltip>
        </q-btn>
        <q-btn v-if="isMaximizable" dense flat icon="crop_square" @click="maximizedToggle = true"
          :disable="maximizedToggle">
          <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary">Maximize</q-tooltip>
        </q-btn>
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section>
        <div class="row">
          <slot name="title">
            <div class="text-h6" v-text="modalTitle"></div>
          </slot>
          <q-btn v-if="!isLoading" outline icon="sync" class="q-ml-sm" @click.prevent="getOutputText(modalOutputUrl)">
            Refresh
          </q-btn>
        </div>
      </q-card-section>

      <q-card-section style="max-height: 80vh" class="scroll q-pt-none">
        <q-inner-loading :showing="isLoading">
          <q-spinner-gears size="50px" color="primary" />
        </q-inner-loading>
        <pre>
          {{ modalBody }}
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
