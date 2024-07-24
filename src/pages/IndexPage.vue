<template>
  <q-page class="row justify-center q-px-lg">
    <div class="row book-container justify-start">
      <div v-for="book in books" :key="book.isbn" class="row justify-center col-12 col-sm-4 col-md-3 col-lg-2">
        <book-view :book="book"></book-view>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import BookView from 'src/components/BookView.vue';
import { useQuasar } from 'quasar';
import { useBookFetcher } from 'src/composables/BookFetcher';
import { watch } from 'vue';

const $q = useQuasar();

defineOptions({
  name: 'IndexPage'
});

const { books, error } = useBookFetcher();

watch(error, () => { $q.notify({ color: 'negative', message: 'An error happened during fetching content.' }) })

</script>

<style>
.book-container {
  align-content: flex-start;
}
</style>