import { ref } from 'vue';
// import { useFetch } from './useFetch';
import { api } from 'src/boot/axios';
import { AxiosError, AxiosResponse } from 'axios';

export interface Book {
  title: string;
  isbn: string;
  authors: Array<Author>;
  pubDate: string;
  url: string;
}

export interface Author {
  firstName: string;
  lastName: string;
  birthDate: string;
  url: string;
}

type AuthorDict = { [url: string]: Author };

/**
 * Fetches books from the API and returns them along with any error that occurred.
 * @returns An object containing the fetched books and any error that occurred.
 */
export function useBookFetcher() {
  const books = ref<Book[] | null>(null);
  const error = ref<AxiosError | null>(null);
  api
    .get('/api/books/')
    .then((response) => {
      parseAuthorsFromResponse(response).then((authorDict) => {
        books.value = parseBooksFromResponse(response, authorDict);
      });
    })
    .catch((e) => {
      error.value = e;
    });

  return { books, error };
}

/**
 * Parses authors from the response and returns an AuthorDict object.
 * @param response - The AxiosResponse object containing the response data.
 * @returns A Promise that resolves to an AuthorDict object.
 */
async function parseAuthorsFromResponse(
  response: AxiosResponse
): Promise<AuthorDict> {
  const authors: AuthorDict = {};

  const booksPromises = response.data.results.map(
    async (book: typeof response.data) => {
      const bookAuthorPromises = book.authors.map(async (authorUrl: string) => {
        if (!(authorUrl in authors)) {
          const res = await api.get(authorUrl);
          authors[res.data.url] = {
            firstName: res.data.first_name,
            lastName: res.data.last_name,
            birthDate: res.data.birth_date,
            url: res.data.url,
          };
        }
      });
      await Promise.all(bookAuthorPromises);
    }
  );
  await Promise.all(booksPromises);

  return authors;
}

/**
 * Parses the books from the response and returns an array of Book objects.
 * @param response - The AxiosResponse object containing the response data.
 * @param authorDict - The dictionary of authors.
 * @returns An array of Book objects.
 */
function parseBooksFromResponse(
  response: AxiosResponse,
  authorDict: AuthorDict
): Book[] {
  const books: Book[] = [];
  response.data.results.forEach((book: typeof response.data) => {
    books.push({
      isbn: book.isbn,
      title: book.title,
      pubDate: book.pub_date,
      authors: book.authors.map((url: string) => authorDict[url]),
      url: book.url,
    });
  });
  return books;
}
