<template>
  <q-page class="row items-center justify-start q-px-lg">
    <!-- <example-component title="Example component" active :todos="todos" :meta="meta"></example-component> -->
    <div v-for="(n, index) in 10" :key="index" class="row justify-center col-12 col-sm-4 col-md-3 col-lg-2">
      <book-view book-name="kokos" book-author="Dostojevsky" pub-date="2020-10-10"></book-view>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import BookView from 'src/components/BookView.vue';
import { useBookFetcher } from 'src/composables/BookFetcher';

defineOptions({
  name: 'IndexPage'
});

const { books, error } = useBookFetcher();



</script>
