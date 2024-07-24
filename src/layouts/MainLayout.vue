<template>
  <q-layout view="lHh Lpr lFf">
    <div class="text-center">
      <h3>Library browser</h3>
    </div>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">

defineOptions({
  name: 'MainLayout'
});

</script>
