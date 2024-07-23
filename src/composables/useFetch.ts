import { ref } from 'vue';

export function useFetch<Type>(url: string) {
  const data = ref<Type | null>(null);
  const error = ref<Error | null>(null);

  fetch(url)
    .then((res) => res.json())
    .then((json) => (data.value = json))
    .catch((err) => (error.value = err));

  return { data, error };
}
