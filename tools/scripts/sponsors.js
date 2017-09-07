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

const query = `SELECT * from sponsors`;
const dest = "./__fixtures__/simple/sponsors.json";
const onError = err => console.log(err);

const createSponsor = async s => {
  try {
    const result = await gqlClient.mutate(`{
      sponsor: createSponsor(
        dbId: ${s.id}
        dbCreatedAt: "${new Date(Date.parse(s.created_at)).toISOString()}"
        dbUpdatedAt: "${new Date(Date.parse(s.updated_at)).toISOString()}"
        name: "${s.name}"
        description: "${s.description}"
        avatar: "${s.avatar}"
        website: "${s.website}"
        seats: ${s.seats}
        imageCache: "${s.image_cache}"
        numberOfCoaches: ${s.number_of_coaches ? s.number_of_coaches : 0}
        email: "${s.email}"
        contactFirstname: "${s.contact_first_name || ""}"
        contactSurname: "${s.contact_surname || ""}"
      ) {
        id
      }
    }`);

    return result.sponsor.id;
  } catch (e) {
    console.log(e);
  }
};

const createSponsors = async () => {
  await dbClient.connect();

  const res = await dbClient.query(query);
  const ids = await Promise.all(res.rows.map(createSponsor));

  await dbClient.end();

  return _.zipObject(ids, res.rows.map(sponsor => sponsor.id));
};

const init = async () => {
  const ids = await createSponsors();

  writeFile(dest, JSON.stringify(ids, null, 2), onError);

  console.log(`Created ${Object.keys(ids).length} sponsors`);
};

init().catch(e => console.error(e));
