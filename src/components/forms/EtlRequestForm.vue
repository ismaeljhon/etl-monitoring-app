<script lang="ts" setup>
import { reactive } from "vue";
import { useRoute } from "vue-router";
import { date } from 'quasar'
import { useEtlCompanyRestriction } from "../../composables/EtlRules";

const route = useRoute();
const today = date.formatDate(Date.now(), 'YYYY/MM/DD')
const lastAllowedDay = date.formatDate(
  date.subtractFromDate(today, { months: 3 }),
  'YYYY/MM/DD'
)

const { company_code } = route.params
const code = company_code.toString()

const optionsFn = (d) => {
  return d >= lastAllowedDay && d <= today
}
const data = reactive({
  code,
  date: "",
});


const { isCompanyRestrictedToRunEtl } = useEtlCompanyRestriction(code)


defineEmits(["input"])

</script>
<template>
  <q-banner v-if="isCompanyRestrictedToRunEtl" class="text-white bg-warning q-mb-md">
    <template #avatar>
      <q-icon name="warning" />
    </template>
    Re-ETL regular schedule for this company is from <strong>4:01AM - 5:59PM</strong>. <br /><br />
    Kindly proceed with caution, Devs are in bed cushion.
  </q-banner>
  <q-input label="Company" dense v-model="data.code" readonly autofocus />
  <div class="q-ma-sm">
    <q-input dense v-model="data.date" mask="date" :rules="['date']">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="data.date" :options="optionsFn" @update:model-value="$emit('input', data)">
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