<template>
  <div>
    <q-layout view="lHh lpr lFf">
      <q-header elevated>
        <q-toolbar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>

          <q-toolbar-title> ETL Monitoring App </q-toolbar-title>

          <router-link to="/" custom v-slot:default="props">
            <q-btn v-bind="homeProps(props)" />
          </router-link>
          <router-link to="/sync" custom v-slot:default="props">
            <q-btn v-bind="syncProps(props)" />
          </router-link>
          <router-link to="/etl" custom v-slot:default="props">
            <q-btn v-bind="etlProps(props)" />
          </router-link>
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

const syncProps = ({ href, route, isActive, isExactActive }) => {
  const props = {
    color: "white",
    noCaps: true,
    label: `Sync`,
    flat: true,
    to: href,
  };

  if (isActive === true) {
    props.color = isExactActive === true ? "yellow" : "amber-9";
  } else {
    props.color = "white";
  }

  return props;
};

const homeProps = ({ href, route, isActive, isExactActive }) => {
  const props = {
    color: "white",
    noCaps: true,
    label: `Home`,
    flat: true,
    to: href,
  };

  if (isActive === true) {
    props.color = isExactActive === true ? "yellow" : "amber-9";
  } else {
    props.color = "white";
  }

  return props;
};

const etlProps = ({ href, route, isActive, isExactActive }) => {
  const props = {
    color: "white",
    noCaps: true,
    label: `ETL`,
    flat: true,
    to: href,
  };

  if (isActive === true) {
    props.color = isExactActive === true ? "yellow" : "amber-9";
  } else {
    props.color = "white";
  }

  return props;
};

const posts = ref<Post[]>([]);
(async () => {
  posts.value = await new PostsApiService().getList({ _start: 0, _limit: 5 });
})();
</script>
