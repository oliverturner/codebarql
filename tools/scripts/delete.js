const Bluebird = require("bluebird");
const _ = require("lodash");

import request from "./request";

const queryBatch = () => {
  return request(`
    query getMembers { members: allMembers(first: 100) { id }}
  `);
};

const deleteBatch = async () => {
  console.log("Fetching new nodes");
  const items = (await queryBatch()).items;

  if (items && items.length > 0) {
    console.log(`Deleting next batch of ${items.length} members...`);
    const mutations = _.chain(items)
      .map(member => `{deleteMember(id: "${member.id}") { id }}`)
      .value();

    await Bluebird.map(mutations, m => request(m), { concurrency: 4 });
    await deleteBatch();
  }
};

const main = async () => {
  // query total members:
  const itemMeta = await request(`{
    meta: _allMembersMeta { count }
  }`);

  console.log(`Deleting ${itemMeta.meta.count} items...`);
  await deleteBatch();

  console.log("Done!");
};

main().catch(e => console.error(e));
