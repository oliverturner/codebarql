const Lokka = require("lokka").Lokka;
const Transport = require("lokka-transport-http").Transport;
const _ = require("lodash");
const sponsors = require("../../__fixtures__/aggregated/sponsors.json");

process.env.TZ = "UTC";

const client = new Lokka({
  transport: new Transport(
    "https://api.graph.cool/simple/v1/cj6w1qgsw03m70112bnc6etxj"
  )
});

const createSponsor = async sponsor => {
  try {
    const result = await client.mutate(`{
      sponsor: createSponsor(
        dbId: ${sponsor.dbId}
        dbCreatedAt: "${sponsor.dbCreatedAt}"
        dbUpdatedAt: "${sponsor.dbUpdatedAt}"
        name: "${sponsor.name}"
        description: "${sponsor.description}"
        avatar: "${sponsor.avatar}"
        website: "${sponsor.website}"
        seats: ${sponsor.seats}
        email: "${sponsor.email}"
        numberOfCoaches: ${sponsor.numberOfCoaches ? sponsor.numberOfCoaches : 0}
        imageCache: "${sponsor.imageCache}"
        contactFirstname: "${sponsor.contactFirstname}"
        contactSurname: "${sponsor.contactSurname}"
        address: {
          dbId: ${sponsor.address.dbId}
          dbCreatedAt: "${sponsor.address.dbCreatedAt}"
          dbUpdatedAt: "${sponsor.address.dbUpdatedAt}"
          flat: "${sponsor.address.flat}"
          street: "${sponsor.address.street}"
          city: "${sponsor.address.city}"
          postalCode: "${sponsor.address.postalCode}"
        }
        chapter: {
          dbId: ${sponsor.chapter.dbId}
          dbCreatedAt: "${sponsor.chapter.dbCreatedAt}"
          dbUpdatedAt: "${sponsor.chapter.dbUpdatedAt}"
          name: "${sponsor.chapter.name}"
          city: "${sponsor.chapter.city}"
          email: "${sponsor.chapter.email}"
          twitter: "${sponsor.chapter.twitter}"
          slug: "${sponsor.chapter.slug}"
          active: ${sponsor.chapter.active}
        }
      ) {
        id
      }
    }`);
    return result.sponsor.id;
  } catch (e) {
    console.log(e);
  }
};

const createSponsors = async sponsors => {
  const sponsorIds = await Promise.all(sponsors.map(createSponsor));

  return _.zipObject(sponsors.map(sponsor => sponsor.id), sponsorIds);
};

const init = async () => {
  const sponsorIdMap = await createSponsors(sponsors);
  console.log(`Created ${Object.keys(sponsorIdMap).length} sponsors`);
};

init().catch(e => console.error(e));
