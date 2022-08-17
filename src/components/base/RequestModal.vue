<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="modal" persistent>
      <q-card style="width: 500px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">ETL Request</div>
        </q-card-section>

        <q-separator />

        <q-card-section class="q-pa-lg">
          <q-input label="Company" dense v-model="name" readonly autofocus />
          <div class="q-ma-sm">
            <q-input dense v-model="date" mask="date" :rules="['date']">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="date">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn
            flat
            label="Request"
            :disable="name && date ? false : true"
            @click="secondDialog = true"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="secondDialog"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card style="width: 300px">
        <q-card-section>
          <div class="row">
            <div class="text-h6 q-mr-auto">Alert</div>
            <q-avatar icon="warning" color="teal" text-color="white" />
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <span class="q-ma-none"
            >{{
              `You are about to trigger ETL for ${name} with the date ${date}`
            }}
          </span>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" @click="executeClick" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Alert from "./Alert.vue";

// declarations
interface Props {
  type?: string;
  code?: string;
}
const props = defineProps<Props>();
const modal = ref(false);
const date = ref("");
const name = ref("");
const secondDialog = ref(false);

// methods
const executeClick = async () => {
  const request = {
    code: name.value,
    date: date.value,
  };
  console.log(request);
};

const toggleRequest = (code) => {
  name.value = code;
  if (modal.value) {
    modal.value = false;
  } else {
    modal.value = true;
  }
};

// hooks
defineExpose({
  toggleRequest,
});
</script>
