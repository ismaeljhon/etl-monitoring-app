<script setup lang="ts">
import { useQuasar } from 'quasar'
import TableList from "../components/base/TableList.vue";
import CompanyService from "../services/CompanyService";
import { companyColumns } from "../composables/TableColumns";
import { Company } from "../interfaces/company.interface";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import RequestModal from "../components/base/RequestModal.vue";
import EvaluateApiService from "../services/base/EvaluateApiService";

const $q = useQuasar()
const companies = ref<Company[]>([]);
const router = useRouter();
const requestModal = ref()
const selectedCompanyForClearCache = ref<string>('')
const isLoadingClearCache = ref<boolean>(false)

const showConfirmationForClearCache = (companyCode: string) => {
  selectedCompanyForClearCache.value = companyCode
  requestModal.value.show = true
}

const clearCache = async () => {
  if (!selectedCompanyForClearCache.value)
    return

  isLoadingClearCache.value = true

  try {
    await new EvaluateApiService().clearCache(selectedCompanyForClearCache.value)
  } catch (e) {
    $q.notify({
      type: 'negative',
      message: 'There something wrong with clear cache. Please contact fe devs for support'
    })
    console.error(e)
  }

  isLoadingClearCache.value = false
  requestModal.value.closeModal()

  $q.notify({
    type: 'positive',
    message: `Clear cache for company ${selectedCompanyForClearCache.value} has been successfully executed`
  })
  selectedCompanyForClearCache.value = ''
}

const loading = ref(false)
const fetchCompanies = async () => {
  try {
    loading.value = true
    companies.value = await new CompanyService().getList();
    loading.value = false
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  fetchCompanies()
});
</script>

<template>
  <div>
    <div class="row">
      <div class="col">
        <TableList :loading="loading" title="Companies" :rows="companies" :columns="companyColumns" row-key="name"
          @refresh="fetchCompanies">
          <template #status="row">
            <q-badge :color="row.obj.status === 'ACTIVE' ? 'green' : 'red'">
              {{ row.obj.status }}
            </q-badge>
          </template>
          <template #actions="{ row }">
            <q-btn size="sm" flat color="info" @click.prevent="router.push(`${row.code}/webjobs/etl`)">
              ETL
            </q-btn>
            <q-btn size="sm" flat color="secondary" @click.prevent="router.push(`${row.code}/webjobs/sync`)">
              Sync
            </q-btn>
            <q-btn size="sm" flat color="red-5" @click.prevent="showConfirmationForClearCache(row.code)">
              Clear Cache
            </q-btn>
          </template>

          <template #custom-grid="{ items }">
            <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 grid-style-transition">
              <q-card>
                <q-card-section>
                  <div class="row">
                    <div class="col float-left">
                      <b>{{ items.row.name }}</b>
                    </div>
                    <div class="col float-right">
                      <q-btn size="sm" flat color="info" @click.prevent="router.push(`${items.row.code}/webjobs/etl`)">
                        ETL
                      </q-btn>
                      <q-btn size="sm" flat color="secondary"
                        @click.prevent="router.push(`${items.row.code}/webjobs/sync`)">
                        Sync
                      </q-btn>
                    </div>
                  </div>
                </q-card-section>
                <q-separator />
                <q-card-section>
                  <q-item-section>
                    <q-item-label> Code: {{ items.row.code }} </q-item-label>
                    <q-item-label>
                      Status:
                      <q-chip :color="items.row.status === 'ACTIVE' ? 'green' : 'red'" text-color="white" dense square>
                        {{ items.row.status }}
                      </q-chip>
                    </q-item-label>
                  </q-item-section>
                </q-card-section>
              </q-card>
            </div>
          </template>
        </TableList>
      </div>
    </div>
    <div class="row">
      <div class="col"></div>
    </div>
  </div>

  <RequestModal type="clear-cache" ref="requestModal">
    <template #body-text>Are you sure you want to clear cache?</template>
    <template #footer-btns>
      <q-btn label="Cancel" v-close-popup v-show="!isLoadingClearCache" />
      <q-btn color="primary" label="Confirm" @click.prevent="clearCache" :loading="isLoadingClearCache" />
    </template>
  </RequestModal>
</template>