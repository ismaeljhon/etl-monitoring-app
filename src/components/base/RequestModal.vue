<script setup lang="ts">
import { computed, ref, defineAsyncComponent, defineComponent } from "vue";

// declarations
interface Props {
  type: string;
}
const props = defineProps<Props>();
const data = ref();
const show = ref(false);
const emit = defineEmits(["data"]);

const requestTitle = computed(() => {
  return `${props.type.toUpperCase()} Request`;
});

const closeModal = () => {
  show.value = false;
};

const formMapping = {
  etl: defineAsyncComponent(() => import("../forms/EtlRequestForm.vue")),
};

const catchData = (data) => {
  emit('data', data)
};

defineExpose({
  show,
  closeModal,
});
</script>
<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="show">
      <q-card style="width: 500px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6" v-text="requestTitle"></div>
        </q-card-section>

        <q-separator />

        <q-card-section class="q-pa-lg">
          <slot name="body-text"></slot>
          <component :is="formMapping[props.type]" @input="catchData" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <slot name="footer-btns">
            <q-btn flat label="Cancel" v-close-popup />
            <q-btn flat label="Request" v-close-popup />
          </slot>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>