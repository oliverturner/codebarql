// @flow

import writeFile from "write";
import { Client } from "pg";
import { argv } from "yargs";

import { getChunkedRows, getRange } from "./utils";

const table = argv.table || argv.t;
const mutation = require(`../mutations/${table}`).default;
const chunkNum = 100;

process.env.TZ = "UTC";

const onError = err => console.log(err);

async function _map([head, ...rest], fn, acc = []) {
  if (!head) {
    return acc;
  }

  return _map(rest, fn, [...acc, await fn(head)]);
};
const movies = ['lost in translation', 'donnie darko'];
const search = movie =>
  new Promise(resolve => setTimeout(() => resolve(movie.toUpperCase()), 1000));


const createRecords = async () => {
  const dbUrl = "postgresql://codebar@0.0.0.0:5432/codebar-production";
  const dbClient = new Client({ connectionString: dbUrl });
  const dbQuery = `SELECT * from ${table} LIMIT 1000`;

  await dbClient.connect();

  const res = await dbClient.query(dbQuery);
  const chunks = getChunkedRows(res.rows, chunkNum);
  // const ids = await Promise.all(chunks.map(createChunk(mutation)));
  const ids = await Promise.all(
    // chunks.map(async (chunk, index) => {
    //   console.log(`[${getRange(index, chunk.length).join("-")}] start`);
    //   const chunkIds = await Promise.all(chunk.map(mutation));
    //   console.log(`[${getRange(index, chunk.length).join("-")}] end`);

    //   return chunkIds;
    // })
  );

  await dbClient.end();

  return ids;
};

const init = async () => {
  const dest = `./__fixtures__/simple/${table}.json`;
  // const ids = await createRecords();
  const ids = await _map(movies, movie => search(movie));
  console.log(ids);
  
  writeFile(dest, JSON.stringify(ids, null, 2), onError);

  console.log(`Created ${Object.keys(ids).length} records`);
};

init().catch(e => console.error(e));
