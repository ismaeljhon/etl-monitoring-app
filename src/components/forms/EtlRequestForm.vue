<script lang="ts" setup>
import { reactive } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const data = reactive({
  name: route.params.company_code.toString(),
  date: "",
});

defineEmits(["input"])
</script>
<template>
  <q-input label="Company" dense v-model="data.name" readonly autofocus />
  <div class="q-ma-sm">
    <q-input
      dense
      v-model="data.date"
      mask="date"
      :rules="['date']"
    >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="data.date" @update:model-value="$emit('input', data)">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>