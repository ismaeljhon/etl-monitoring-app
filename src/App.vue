<template>
  <div>
    <q-layout view="lHh lpr lFf" >
      <q-header elevated>
        <q-toolbar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>

          <q-toolbar-title>
            ETL Monitoring App
          </q-toolbar-title>

          <q-btn flat round dense icon="whatshot" />
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page class="q-pa-md">
          <router-view></router-view>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Post } from "./interfaces/post.interface";
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
