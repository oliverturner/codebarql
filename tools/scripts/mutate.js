import writeFile from "write";
import { Client } from "pg";
import _ from "lodash";
import { argv } from "yargs";

const table = argv.table || argv.t;
const mutation = require(`../mutations/${table}`).default;

process.env.TZ = "UTC";

const dbUrl = "postgresql://codebar@0.0.0.0:5432/codebar-production";
const dbClient = new Client({ connectionString: dbUrl });

const query = `SELECT * from ${table} LIMIT 1000 OFFSET 1000`;
const dest = `./__fixtures__/simple/${table}.json`;
const onError = err => console.log(err);

const createRecords = async () => {
  await dbClient.connect();

  const res = await dbClient.query(query);
  const ids = await Promise.all(res.rows.map(mutation));
  
  await dbClient.end();

  return ids;
};

const init = async () => {
  const ids = await createRecords();

  writeFile(dest, JSON.stringify(ids, null, 2), onError);

  console.log(`Created ${Object.keys(ids).length} records`);
};

init().catch(e => console.error(e));
