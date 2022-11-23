<script setup lang="ts">
import { useRouter } from "vue-router";
import MsalService from "../services/base/MsalService";
import { showSimpleNotification } from '../composables/Notify'

// declarations
const router = useRouter()

// functions
const signIn = async () => {
  const resp = await new MsalService().signIn()
  if (resp) {
    showSimpleNotification(`Welcome ${resp?.name}`)
    router.push('/companies')
  }
}

</script>

<template>
  <div>
    HOME
    <q-btn @click="signIn">Sign In</q-btn>
  </div>
</template>
