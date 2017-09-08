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
      event: createEvent(
        dbId: ${row.id}
        dbCreatedAt: "${new Date(Date.parse(row.created_at)).toISOString()}"
        dbUpdatedAt: "${new Date(Date.parse(row.updated_at)).toISOString()}"
        flat: "${row.flat}"
        name: "${row.name}"
        description: "${row.description}"
        dateAndTime: "${new Date(Date.parse(row.date_and_time)).toISOString()}"
        endsAt: "${new Date(Date.parse(row.ends_at)).toISOString()}"
        slug: "${row.slug}"
        schedule: "${row.schedule}"
        coachSpaces: "${row.coach_spaces}"
        studentSpaces: "${row.student_spaces}"
        coachQuestionnaire: "${row.coach_questionnaire}"
        studentQuestionnaire: "${row.student_questionnaire}"
        coachDescription: "${row.coach_description}"
        info: "${row.info}"
        announceOnly: ${row.announce_only}
        url: "${row.url}"
        email: "${row.email}"
        invitable: ${row.invitable}
        titoUrl: "${row.tito_url}"
        showFaq: "${row.show_faq}"
        displayStudents: "${row.display_students}"
        displayCoaches: "${row.display_coaches}"
        externalUrl: "${row.external_url}"
        confirmationRequired: ${row.confirmation_required}
        surveysRequired: ${row.surveys_required}
        audience: "${row.audience}"
      ) {
        id
      }
    }`);

    return result.event.id;
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
