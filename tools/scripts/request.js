import { request } from "graphql-request";

const endpoint = "https://api.graph.cool/simple/v1/cj6w1qgsw03m70112bnc6etxj";

const mutation = (query) => {
  return request(endpoint, `mutation {${query}}`)
}

export default mutation;
