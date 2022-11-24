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
    router.push("/companies/list");
  }
};
</script>

<template>
  <div>
    <div>
      <div>
        <img style="max-width: 250px;" :src="logo" alt="">
      </div>
    </div>
    <div>
      <div>
        <q-btn @click="signIn">Test</q-btn>
      </div>
    </div>
  </div>
</template>
