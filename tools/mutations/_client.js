const { Lokka } = require("lokka");
const { Transport } = require("lokka-transport-http");

const client = new Lokka({
  transport: new Transport(
    "https://api.graph.cool/simple/v1/cj6w1qgsw03m70112bnc6etxj"
  )
});

// import { GraphQLClient } from 'graphql-request'

// const client = new GraphQLClient(
//   "https://api.graph.cool/simple/v1/cj6w1qgsw03m70112bnc6etxj"
// );

export default client;
