<script lang="ts" setup>import { reactive } from 'vue';

const data = reactive({
  name: '',
  date: ''
})
</script>
<template>
  <q-input label="Company" dense v-model="data.name" readonly autofocus />
  <div class="q-ma-sm">
    <q-input dense v-model="data.date" mask="date" :rules="['date']">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="data.date">
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