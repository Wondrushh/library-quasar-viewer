<template>
    <q-dialog>
        <q-card>
            <q-card-section>
                <div class="text-h4">Book details</div>
            </q-card-section>
            <q-card-section>
                <q-field v-for="(form, i) in Object.keys(bookForm)" :key="i" :label="formNames[form]" stack-label>
                    <template v-slot:control>
                        <div class="self-center full-width no-outline" tabindex="0"> {{ bookForm[form] }}</div>
                    </template>
                </q-field>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { Author, Book } from 'src/composables/BookFetcher';

interface BookForm {
    [key: string]: string;
    title: string,
    isbn: string,
    authors: string,
    pubDate: string,
}

const props = defineProps<{ book: Book }>();

const authorNames: string[] = props.book.authors.map((author: Author) => `${author.firstName} ${author.lastName}`);
const bookForm: BookForm = {
    title: props.book.title,
    authors: authorNames.join(', '),
    pubDate: props.book.pubDate,
    isbn: props.book.isbn,
}
const formNames: { [name: string]: string } = { title: 'Title', authors: 'Authors', pubDate: 'Publication date', isbn: 'ISBN' };


</script>