import { TEST_GET } from "./types";

export function getPosts(posts) {
  return {
    type: TEST_GET,
    payload: posts
  };
}
