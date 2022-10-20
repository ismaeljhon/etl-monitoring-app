<script lang="ts" setup>
import { reactive } from "vue";
import { useRoute } from "vue-router";
import { date } from 'quasar'

const route = useRoute();
const today = date.formatDate(Date.now(), 'YYYY/MM/DD')
const lastAllowedDay = date.formatDate(
  date.subtractFromDate(today, { months: 3 }), 
  'YYYY/MM/DD'
)

const optionsFn = (d) =>  {
  return d >= lastAllowedDay && d <= today
}
const data = reactive({
  code: route.params.company_code.toString(),
  date: "",
});


defineEmits(["input"])
</script>
<template>
  <q-input label="Company" dense v-model="data.code" readonly autofocus />
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
            <q-date v-model="data.date" :options="optionsFn" @update:model-value="$emit('input', data)">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat/>
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>