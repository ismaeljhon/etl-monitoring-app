<template>
  <div>
    <q-layout view="lHh lpr lFf">
      <q-header elevated>
       <div class="row no-wrap">
        <q-toolbar >
          <q-avatar square>
            <img :src="logo" />
          </q-avatar>
          <q-btn to="/companies/list" :ripple="false">
            <q-toolbar-title class="title"> ETL - SYNC Monitoring </q-toolbar-title>
          </q-btn>
        </q-toolbar>
        <q-toolbar>
         <q-space/>
          <User :account="account" @signout="signOut" />
        </q-toolbar>
       </div>
       
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
import { onMounted, ref } from "vue";
import logo from "../assets/inriver-logo-black.png";
import MsalService from "../services/base/MsalService";
import User from "../components/User.vue";

// declarations
const account = ref();

// functions
const fetchUser = async () => {
  account.value = await new MsalService().getActiveAccount();
};

const signOut = async () => {
  await new MsalService().signOut();
};

onMounted(async () => {
  fetchUser();
});
</script>

<style scoped>
 .title {
  font-size: 0.875em;
 }
</style>
