<template>
  <v-app>
    <v-main>
      <v-app-bar color="primary" density="compact">
        <v-app-bar-title>ETL Monitoring App</v-app-bar-title>
        <template v-slot:append>
          <v-btn icon="mdi-dots-vertical"></v-btn>
        </template>
      </v-app-bar>
      <v-container class="pa-5">
        <v-row>
          <v-col cols="12" class="pt-10">
            <TableList
              :headers="headers"
              :items="posts"
              :refresh="false"
              :search="true"
              :pagination="true"
            >
              <template #top-left>
                <div class="text-h5">Companies</div>
              </template>
              <template #actions>
                <a>View Details</a>
              </template>
              <template #id-mobile>
                <div class="text-h6"> Title: </div>
              </template>
            </TableList>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="pt-10">
            <Dashboard></Dashboard>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Post } from "./interfaces/post.interface";
import TableList from "./components/base/TableList.vue";
import Dashboard from "./components/Dashboard.vue";
import PostsApiService from "./services/PostsApiService";

const headers = [
  { value: "id", text: "ID" },
  { value: "title", text: "Title" },
  { value: "body", text: "Body" },
];

const posts = ref<Post[]>([]);
(async () => {
  posts.value = await new PostsApiService().getList();
})();
</script>
