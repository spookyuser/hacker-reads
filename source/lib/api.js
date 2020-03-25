import { Comment, Paginator } from "./objects";

const BASE_URL = "https://hn.algolia.com/api/v1/";

/** Interface for searching the Algolia API
 * @returns a Paginator object and Comments array
 */
export async function search(parameters) {
  const url = new URL("search", BASE_URL);
  url.search = new URLSearchParams(parameters).toString();

  return fetch(url)
    .then(response => response.json())
    .then(json => {
      const paginator = Paginator.fromJson(json);
      const comments = json.hits.map(Comment.fromHit);
      return [paginator, comments];
    });
}
