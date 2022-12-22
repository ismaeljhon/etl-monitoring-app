<script setup lang="ts">
import { useRouter } from "vue-router";
import { onMounted } from "vue";

// declarations
const router = useRouter();

onMounted(() => {
  router.push('/auth/login')
})
</script>

<template>

</template>
