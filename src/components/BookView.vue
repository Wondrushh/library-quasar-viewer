<template>
    <div ref="bookRef" class="book cursor-pointer q-ma-md" @click="displayBookData">
        <p class="text-subtitle1 book__name">{{ book.title }}</p>
        <div class="book__spacer"></div>
        <p v-for="(name, i) in authorNames" :key="i" class="book__author">{{ name }}</p>
        <p class="textbook__pub_date">{{ book.pubDate }}</p>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Author, Book } from 'src/composables/BookFetcher';
import BookDataDlg from './BookDataDlg.vue';
import { useQuasar } from 'quasar';

defineOptions({
    name: 'BookView'
});

const $q = useQuasar();


const props = defineProps<{ book: Book }>();

const bookRef = ref<HTMLElement | null>(null);

const authorNames: string[] = props.book.authors.map((author: Author) => `${author.firstName} ${author.lastName}`);

onMounted(() => {
    if (bookRef.value !== null) {
        const scale = 200;
        const rgb = [Math.random() * scale, Math.random() * scale, Math.random() * scale];
        bookRef.value.style.backgroundColor = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.4)`
    }
});

function displayBookData() {
    $q.dialog({
        component: BookDataDlg,
        componentProps: {
            book: props.book
        }
    })
}

</script>

<style>
.book {
    display:flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1rem;
    height: 12rem;
    width: 9.5rem;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    transition: all 200ms ease-out;
    z-index: 99;
}

.book__spacer {
    flex-grow:1;
}

.book:hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
</style>