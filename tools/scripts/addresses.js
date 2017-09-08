const writeFile = require("write");
const { Client } = require("pg");
const { Lokka } = require("lokka");
const { Transport } = require("lokka-transport-http");
const _ = require("lodash");

process.env.TZ = "UTC";

const dbUrl = "postgresql://codebar@0.0.0.0:5432/codebar-production";
const dbClient = new Client({ connectionString: dbUrl });

const gqlClient = new Lokka({
  transport: new Transport(
    "https://api.graph.cool/simple/v1/cj6w1qgsw03m70112bnc6etxj"
  )
});

const query = `SELECT * from addresses`;
const dest = "./__fixtures__/simple/addresses.json";
const onError = err => console.log(err);

const createRecord = async row => {
  try {
    const result = await gqlClient.mutate(`{
      address: createAddress(
        dbId: ${row.id}
        dbCreatedAt: "${new Date(Date.parse(row.created_at)).toISOString()}"
        dbUpdatedAt: "${new Date(Date.parse(row.updated_at)).toISOString()}"
        flat: "${row.flat}"
        street: "${row.street}"
        city: "${row.city}"
        postalCode: "${row.postal_code}"
      ) {
        id
      }
    }`);

    return result.address.id;
  } catch (e) {
    console.log(e);
  }
};

const createRecords = async () => {
  await dbClient.connect();

  const res = await dbClient.query(query);
  const ids = await Promise.all(res.rows.map(createRecord));

  await dbClient.end();

  return _.zipObject(ids, res.rows.map(row => row.id));
};

const init = async () => {
  const ids = await createRecords();

  writeFile(dest, JSON.stringify(ids, null, 2), onError);

  console.log(`Created ${Object.keys(ids).length} records`);
};

init().catch(e => console.error(e));
