<script setup lang="ts">
import { reactive, ref } from "vue";
import { useDisplay } from "vuetify";
import BaseButton from "./Button.vue";

interface Header {
  value: string;
  text: string;
}
interface Props {
  items: Array<Object>;
  headers: Header[];
  refresh?: Boolean;
  pagination?: Boolean;
  search?: Boolean;
}
defineProps<Props>();
const { mobile } = useDisplay();
const page = ref(1);
const filter = reactive({
  search: "",
});
</script>
<template>
  <v-card class="pa-5">
    <v-row justify="space-around" dense>
      <v-col cols="12" md="12" lg="3">
        <slot name="top-left"> </slot>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" md="12" lg="3" v-if="search">
        <!--yeah not really sure about v-if="search"-->
        <slot name="top-middle">
          <!-- remove default items in slots or utilize props for showing search element... hhhhhmmmmm -->
          <v-text-field
            v-model="filter.search"
            density="compact"
            variant="outlined"
            label="Search"
          ></v-text-field>
        </slot>
      </v-col>
      <v-spacer></v-spacer>
      <!-- <v-col cols="12" md="12" lg="3" v-if="pagination">
        <slot name="top-right">
          <v-pagination
            v-model="page"
            :length="6"
            density="compact"
          ></v-pagination>
        </slot>
      </v-col> -->
      <v-col cols="12" md="12" lg="3">
        <BaseButton
          :class="mobile ? 'my-4' : 'float-lg-right'"
          :block="mobile ? true : false"
        >
          <template #label> refresh </template>
        </BaseButton>
      </v-col>
    </v-row>
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="12" md="12" lg="3" v-if="pagination">
        <slot name="top-right">
          <v-pagination
            v-model="page"
            :length="6"
            density="compact"
          ></v-pagination>
        </slot>
      </v-col>
    </v-row>
    <div class="hidden-md-and-down">
      <v-row>
        <v-col>
          <v-table height="500">
            <thead>
              <tr>
                <th v-for="item in headers" :key="item.value">
                  {{ item.text }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in items" :key="index">
                <td v-for="(header, headerIndex) in headers" :key="headerIndex">
                  <slot :name="header.value">
                    {{ item[header.value] }}
                  </slot>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row>
    </div>
    <div class="hidden-md-and-up">
      <v-row>
        <v-col v-for="item in items" cols="12">
          <v-card class="pa-5">
            <v-card-text
              v-for="(header, headerIndex) in headers"
              :key="headerIndex"
            >
              <slot :name="`${header.value}-mobile`">
                {{ item[header.value] }}
              </slot>
            </v-card-text>
            <v-card-actions>
              <v-btn class="ml-2" variant="outlined" size="small">
                View Details
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <v-row justify="center">
      <v-col>
        <slot name="botton-left"></slot>
      </v-col>
      <v-col>
        <slot name="botton-middle"></slot>
      </v-col>
      <v-col cols="12" lg="3" v-if="pagination">
        <slot name="botton-right">
          <v-pagination
            v-model="page"
            density="compact"
            :length="6"
          ></v-pagination>
        </slot>
      </v-col>
    </v-row>
  </v-card>
</template>
