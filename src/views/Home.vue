<script setup lang="ts">
import TableList from "../components/base/TableList.vue";
import CompanyService from "../services/CompanyService";
import { companyColumns } from '../composables/TableColumns'
import companiesJson from '../assets/companies.json'
import { Company } from "../interfaces/company.interface";
import { ref } from "vue";

const companies = ref<Company[]>(companiesJson)
</script>

<template>
  <div>
    <div class="row">
      <div class="col">
        <TableList title="Companies" :rows="companies" :columns="companyColumns" row-key="name">
          <template #status="row">
            <q-badge :color="row.obj.status === 'ACTIVE' ? 'green' : 'red'">
              {{ row.obj.status }}
            </q-badge>
          </template>
          <template #actions="{ row }">
            <q-btn size="sm" flat color="primary" :href="`/companies/${row.code}/webjobs/etl`">
              ETL
            </q-btn>
            <q-btn size="sm" flat color="secondary" :href="`/companies/${row.code}/webjobs/sync`">
              Sync
            </q-btn>
          </template>
        </TableList>
      </div>
    </div>
    <div class="row">
      <div class="col"></div>
    </div>
  </div>
</template>
