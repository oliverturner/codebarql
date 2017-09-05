const writeFile = require("write");
const { Client } = require("pg");
const connectionString =
  "postgresql://codebar:codebar@localhost:5432/codebar-production";

const client = new Client({
  connectionString: connectionString
});
client.connect();

const query = `
SELECT
s.id AS "dbId", s.name, s.description, s.avatar, s.website, s.seats, s.email, 
s.number_of_coaches AS "numberOfCoaches",
s.image_cache AS "imageCache",
s.contact_first_name AS "contactFirstname",
s.contact_surname AS "contactSurname",
s.created_at AS "dbCreatedAt",
s.updated_at AS "dbUpdatedAt",

json_build_object(
  'dbId', c.id, 
  'dbCreatedAt', c.created_at,
  'dbUpdatedAt', c.updated_at,
  'name', c.name, 
  'city', c.city,
  'email', c.email,
  'twitter', c.twitter,
  'slug', c.slug, 
  'active', c.active
) AS chapter,

json_build_object(
  'dbId', a.id, 
  'dbCreatedAt', a.created_at,
  'dbUpdatedAt', a.updated_at,
  'flat', a.flat, 
  'street', a.street, 
  'city', a.city,
  'postalCode', a.postal_code
) AS address,

json_agg(json_build_object(
  'dbId', w.id,
  'dbCreatedAt', w.created_at,
  'dbUpdatedAt', w.updated_at,
  'time', w.time,
  'invitable', w.invitable,
  'dateAndTime', w.date_and_time,
  'rsvpOpenTime', w.rsvp_open_time,
  'rsvpCloseTime', w.rsvp_close_time,
  'rsvpOpenDate', w.rsvp_open_date
)) AS workshops

FROM sponsors s
JOIN addresses a ON a.sponsor_id=s.id
JOIN workshop_sponsors ws ON ws.sponsor_id=s.id
JOIN workshops w ON ws.workshop_id=w.id
JOIN chapters c ON c.id=w.chapter_id
GROUP BY s.id, a.id, c.id
ORDER BY s.created_at
LIMIT 10
`;

client.query(query, null, (err, res) => {
  if (res && res.rows) {
    writeFile(
      "./__fixtures__/aggregated/sponsors.json",
      JSON.stringify(res.rows),
      err => console.log(err)
    );
  } else {
    console.log(err ? err.stack : res.rows && res.rows[0]); // Hello 'rld', rld,!
  }

  client.end();
});
