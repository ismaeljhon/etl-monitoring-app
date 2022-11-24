<template>
  <div>
    <q-layout view="lHh lpr lFf">
      <q-header elevated>
        <q-toolbar>
          <q-avatar square>
            <img :src="logo" />
          </q-avatar>
          <q-btn to="/companies/list" :ripple="false">
            <q-toolbar-title> ETL - SYNC Monitoring </q-toolbar-title>
          </q-btn>
          <q-toolbar-title />
          <!-- <q-separator vertical dark />
          <q-btn :disable="account ? false : true" class="q-ml-sm" flat label="Sign out" @click="signOut" /> -->
          <User :account="account" @signout="signOut"/>
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
import { onMounted, ref, getCurrentInstance } from "vue";
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
