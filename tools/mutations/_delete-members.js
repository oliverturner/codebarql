const Bluebird = require('bluebird')
const _ = require('lodash')
const {Lokka} = require('lokka')
const {Transport} = require('lokka-transport-http')

import client from "./_client"

const queryBatch = () => {
  return client.query(`
    query getMembers {
      members: allMembers(first: 100) {
        id
      }
    }
  `)
}

const deleteBatch = async () => {
  console.log('Fetching new nodes')
  const members = (await queryBatch()).members

  if (members && members.length > 0) {
    console.log(`Deleting next batch of ${members.length} members...`)
    const mutations = _.chain(members)
      .map(member => (
        `{
          deleteMember(id: "${member.id}") {
            id
          }
        }`
      ))
      .value()

    await Bluebird.map(mutations, m => client.mutate(m), {concurrency: 4})
    await deleteBatch()
  }
}

const main = async() => {
  // set to true to create test data
  if (false) {
    console.log(`Creating some posts...`)
    await createPosts()
  } else {
    // query total members:
    const itemMeta = await client.query(`{
      meta: _allMembersMeta {
        count
      }
    }`)

    console.log(`Deleting ${itemMeta.meta.count} items...`)
    await deleteBatch()
  }

  console.log('Done!')
}

main().catch((e) => console.error(e))