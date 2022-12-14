<script setup lang="ts">
import { useRouter } from "vue-router";
import MsalService from "../services/base/MsalService";
import logo from "../assets/inriver-logo-black.png";
import { showSimpleNotification } from "../composables/Notify";

// declarations
const router = useRouter();

// functions
const signIn = async () => {
  const resp = await new MsalService().signIn();
  if (resp) {
    showSimpleNotification(`Welcome ${resp?.name}`)
    router.push("/companies/list");
  }
};
</script>

<template>
  <div class="absolute-center">
    <div class="row">
      <div class="col-24">
        <img style="max-width: 250px;" :src="logo">
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-24 q-my-xl">
        <q-btn @click="signIn">Sign In</q-btn>
      </div>
    </div>
  </div>
</template>
