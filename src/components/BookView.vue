<template>
    <div ref="bookRef" class="book cursor-pointer q-ma-md">
        <p class="text-subtitle1 book__name">{{ props.bookName }}</p>
        <div class="book__spacer"></div>
        <p class="book__author">{{ props.bookAuthor }}</p>
        <p class="textbook__pub_date">{{ props.pubDate }}</p>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
defineOptions({
    name: 'BookView'
});

const props = defineProps({
    bookName: String,
    bookAuthor: String,
    pubDate: String,
})

const bookRef = ref<HTMLElement | null>(null);

onMounted(() => {
    if (bookRef.value !== null) {
        const scale = 200;
        const rgb = [Math.random() * scale, Math.random() * scale, Math.random() * scale];
        bookRef.value.style.backgroundColor = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.4)`
    }
});

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