<template>
  <div>
    <div class="row">
      <div class="col">
        <TableList
          title="Companies"
          :rows="posts"
          :columns="columns"
          :refresh="false"
          :search="true"
          :pagination="true"
        ></TableList>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <Dashboard/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Post } from "../interfaces/post.interface";
import TableList from "../components/base/TableList.vue";
import PostsApiService from "../services/PostsApiService";
import Dashboard from "../components/Dashboard.vue";

const columns = [
  {
    name: "id",
    align: "center",
    label: "ID",
    field: "id",
    sortable: true,
  },
  { name: "title", align: "center", label: "Title", field: "title", sortable: true },
  { name: "body", align: "center", label: "Body", field: "body"},
];

let tab = ref("Home");
const tabs = ["Home", "ETL"];
const posts = ref<Post[]>([]);
(async () => {
  posts.value = await new PostsApiService().getList();
})();
</script>