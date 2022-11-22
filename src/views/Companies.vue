<script setup lang="ts">
import TableList from "../components/base/TableList.vue";
import CompanyService from "../services/CompanyService";
import { companyColumns } from "../composables/TableColumns";
import companiesJson from "../assets/companies.json";
import { Company } from "../interfaces/company.interface";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const companies = ref<Company[]>([]);
const router = useRouter();

onMounted(async () => {
  companies.value = await new CompanyService().getList();
});
</script>

<template>
  <div>
    <div class="row">
      <div class="col">
        <TableList
          title="Companies"
          :rows="companies"
          :columns="companyColumns"
          row-key="name"
        >
          <template #status="row">
            <q-badge :color="row.obj.status === 'ACTIVE' ? 'green' : 'red'">
              {{ row.obj.status }}
            </q-badge>
          </template>
          <template #actions="{ row }">
            <q-btn
              size="sm"
              flat
              color="info"
              @click.prevent="router.push(`companies/${row.code}/webjobs/etl`)"
            >
              ETL
            </q-btn>
            <q-btn
              size="sm"
              flat
              color="secondary"
              @click.prevent="router.push(`companies/${row.code}/webjobs/sync`)"
            >
              Sync
            </q-btn>
          </template>

          <template #custom-grid="{ items }">
            <div
              class="q-pa-xs col-xs-12 col-sm-6 col-md-4 grid-style-transition"
            >
              <q-card>
                <q-card-section>
                  <div class="row">
                    <div class="col float-left">
                      <b>{{ items.row.name }}</b>
                    </div>
                    <div class="col float-right">
                      <q-btn
                        size="sm"
                        flat
                        color="info"
                        @click.prevent="
                          router.push(`companies/${items.row.code}/webjobs/etl`)
                        "
                      >
                        ETL
                      </q-btn>
                      <q-btn
                        size="sm"
                        flat
                        color="secondary"
                        @click.prevent="
                          router.push(
                            `companies/${items.row.code}/webjobs/sync`
                          )
                        "
                      >
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
                      <q-chip
                        :color="items.row.status === 'ACTIVE' ? 'green' : 'red'"
                        text-color="white"
                        dense
                        square
                      >
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
</template>