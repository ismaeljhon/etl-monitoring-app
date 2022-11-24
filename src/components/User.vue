<script setup lang="ts">
interface Props {
  account?: {
    name: string;
    username: string;
  };
}

defineProps<Props>();
defineEmits(["signout"]);
</script>

<template>
  <div class="q-pa-md">
    <div>
      <q-btn flat round dense icon="person">
        <q-menu max-width="300px">
          <q-list>
            <q-item class="q-my-sm">
              <q-item-section>
                <div class="text-body1">{{ account?.name }}</div>
                <div class="text-caption">{{ account?.username }}</div>
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup>
              <q-item-section @click="$emit('signout')">
                Sign out
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>
  </div>
</template>
