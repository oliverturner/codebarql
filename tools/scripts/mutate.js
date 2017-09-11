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

const createRecords = async () => {
  const dbUrl = "postgresql://codebar@0.0.0.0:5432/codebar-production";
  const dbClient = new Client({ connectionString: dbUrl });
  const dbQuery = `SELECT * from ${table}`;

  await dbClient.connect();

  const res = await dbClient.query(dbQuery);
  const chunks = getChunkedRows(res.rows, chunkNum);
  // const ids = await Promise.all(chunks.map(createChunk(mutation)));
  // const ids = await Promise.all(
  // chunks.map(async (chunk, index) => {
  //   console.log(`[${getRange(index, chunk.length).join("-")}] start`);
  //   const chunkIds = await Promise.all(chunk.map(mutation));
  //   console.log(`[${getRange(index, chunk.length).join("-")}] end`);

  //   return chunkIds;
  // })
  // );

  const sendRecords = (resolve, reject) => {
    const ids = [];
    async function sendRecord(sendIndex = 0) {
      try {
        const chunk = chunks[sendIndex];
        if (chunk) {
          console.log(`Posting ${getRange(sendIndex, chunk.length).join("-")}`);
          ids.push(await Promise.all(chunk.map(mutation)));

          return sendRecord(sendIndex + 1);
        }

        resolve(ids);
      } catch (e) {
        reject(e);
      }
    }

    sendRecord();
  };

  const ids = await new Promise((resolve, reject) => {
    console.log("sending records!");
    sendRecords(resolve);
  });

  await dbClient.end();

  return ids;
};

const init = async () => {
  const dest = `./__fixtures__/simple/${table}.json`;
  const ids = await createRecords();

  writeFile(dest, JSON.stringify(ids, null, 2), onError);

  console.log(`Created ${Object.keys(ids).length} records`);
};

init().catch(e => console.error(e));
