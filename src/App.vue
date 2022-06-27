<template>
  <v-app>
    <v-main>
      <v-app-bar color="primary" density="compact">
        <v-app-bar-title>ETL Monitoring App</v-app-bar-title>
        <template v-slot:append>
          <v-btn icon="mdi-dots-vertical"></v-btn>
        </template>
      </v-app-bar>
      <v-container>
        <v-row>
          <v-col cols="12" class="pt-10">
            <TableList :headers="headers" :items="posts">
              <template #top-left>
                <h3>Companies</h3>
              </template>
            </TableList>
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
import PostsApiService from "./services/PostsApiService";

const headers = [
  { value: "id", text: "ID" },
  { value: "title", text: "Title" },
  { value: "body", text: "Body" },
];

const posts = ref<Post[]>([]);
(async () => {
  posts.value = await new PostsApiService().getList({ _start: 0, _limit: 5 });
})();
</script>
