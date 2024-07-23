import { ref } from 'vue';
// import { useFetch } from './useFetch';
import { api } from 'src/boot/axios';
import { AxiosResponse } from 'axios';

interface Book {
  title: string;
  isbn: string;
  authors: Array<Author>;
  pubDate: string;
}

interface Author {
  firstName: string;
  lastName: string;
  birthDate: string;
}

type AuthorDict = { [url: string]: Author };

export function useBookFetcher() {
  const books = ref<Book[] | null>(null);
  const error = ref<Error | null>(null);

  api
    .get('/api/books/')
    .then((response) => {
      parseAuthorsFromResponse(response).then((authors) => {
        books.value = parseBooksFromResponse(response, authors);
      });
      console.log(books.value);
    })
    .catch((e) => {
      error.value = e;
    });

  return { books, error };
}

async function parseAuthorsFromResponse(
  response: AxiosResponse
): Promise<AuthorDict> {
  const authors: AuthorDict = {};

  const authorPromises = response.data.results.map(
    async (book: typeof response.data) => {
      const bookAuthorPromises = book.authors.map(async (authorUrl: string) => {
        if (!(authorUrl in authors)) {
          const authorPromise = await api.get(authorUrl);
          authors[authorPromise.data.url] = {
            firstName: authorPromise.data.first_name,
            lastName: authorPromise.data.last_name,
            birthDate: authorPromise.data.birth_date,
          };
        }
      });
      Promise.all(bookAuthorPromises);
    }
  );

  Promise.all(authorPromises);
  return authors;
}

function parseBooksFromResponse(
  response: AxiosResponse,
  authorDict: AuthorDict
): Book[] {
  const books: Book[] = [];
  console.log(authorDict);
  response.data.results.forEach((book: typeof response.data) => {
    console.log(books);
    books.push({
      isbn: book.isbn,
      title: book.title,
      pubDate: book.pub_date,
      authors: book.authors.map((url: string) => {
        return authorDict[url];
      }),
    });
  });
  return books;
}
