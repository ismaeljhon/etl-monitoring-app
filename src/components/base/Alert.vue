<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="modal" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="warning" text-color="white" />
          <span class="q-ml-sm"
            >{{
              `You are about to trigger ${route.params.name}.`
            }}
          </span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn
            flat
            label="Continue"
            color="primary"
            @click="executeClick"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import SyncService from "../../services/SyncService";

interface Props {
  type?: string;
  code?: string;
}
const props = defineProps<Props>();
const modal = ref(false);
const route = useRoute()

const executeClick = async () => {
  // await new SyncService().trigger(route.params.name.toString())
  console.log('to be safe. will comment this out')
};

const toggleAlert = () => {
  if (modal.value) {
    modal.value = false;
  } else {
    modal.value = true;
  }
};

defineExpose({
  toggleAlert,
});
</script>
