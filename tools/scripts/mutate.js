// @flow

import writeFile from "write";
import { Client } from "pg";
import { argv } from "yargs";

import { getChunkedRows, getRange } from "./utils";

const table = argv.table || argv.t;
const mutation = require(`../mutations/${table}`).default;
const chunkNum = 50;

process.env.TZ = "UTC";

const onError = err => console.log(err);

const sendChunk = async chunk => {
  return await Promise.all(chunk.map(mutation));
};

const sendChunks = async (arr, final) => {
  return await arr.reduce((promise, item) => {
    return promise
      .then(result => {
        console.log(final.length)
        return sendChunk(item).then(result => final.push(result));
      })
      .catch(console.error);
  }, Promise.resolve());
};

const createRecords = async (records) => {
  const dbUrl = "postgresql://codebar@0.0.0.0:5432/codebar-production";
  const dbClient = new Client({ connectionString: dbUrl });
  const dbQuery = `SELECT * from ${table}`;

  await dbClient.connect();

  const res = await dbClient.query(dbQuery);
  const chunks = getChunkedRows(res.rows, chunkNum);
  await sendChunks(chunks, records);

  await dbClient.end();

  return records;
};

const init = async () => {
  const dest = `./__fixtures__/simple/${table}.json`;
  const ids = await createRecords([]);

  writeFile(dest, JSON.stringify(ids, null, 2), onError);

  console.log(`Created ${ids.reduce((n, x) => n + x.length, 0)} records`);
};

init().catch(e => console.error(e));
