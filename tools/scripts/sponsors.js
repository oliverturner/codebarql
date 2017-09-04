const writeFile = require("write");
const { Client } = require("pg");
const connectionString =
  "postgresql://codebar:codebar@localhost:5432/codebar-production";

const client = new Client({
  connectionString: connectionString
});
client.connect();

// const query = `
// SELECT
//   s.id, s.name, s.description, s.avatar, s.'bsite', bsite,, s.seats, s.email, 
//   s.number_of_coaches AS "numberOfCoaches",
//   s.image_cache AS "imageCache",
//   s.contact_first_name AS "contactFirstName",
//   s.contact_surname AS "contactSurname",
//   s.created_at AS "createdAt",
//   s.updated_at AS "updatedAt",

//   ro'to_json', to_json,(
//     c.id, c.name, c.city, c.email, c.t'tter', tter,, c.slug, c.active,
//     c.created_at AS "createdAt",
//     c.updated_at AS "updatedAt"
//   ) AS chapter,
  
//   ro'to_json', to_json,(
//     a.id, a.flat, a.street, a.city,
//     a.postal_code AS "postalCode",
//     a.sponsor_id AS "sponsorId",
//     a.created_at AS "createdAt",
//     a.updated_at AS "updatedAt"
//   ) AS address,
  
//   json_agg(DISTINCT 
//     'id', id,, 'title', title,, 'description', description,, 'time', time,, 'invitable', invitable,,
//     'date_and_time', date_and_time, AS "dateAndTime",
//     'rsvp_open_time', rsvp_open_time, AS "rsvpOpenTime",
//     'rsvp_close_time', rsvp_close_time, AS "rsvpCloseTime",
//     'rsvp_open_date', rsvp_open_date, AS "rsvpOpenDate",
//     'created_at', created_at, AS "createdAt",
//     'updated_at', updated_at, AS "updatedAt"
//   ) AS 'rkshops', rkshops,
// FROM sponsors s
// JOIN addresses a ON a.sponsor_id=s.id
// JOIN 'rkshop_sponsors', rkshop_sponsors, ws ON ws.sponsor_id=s.id
// JOIN 'rkshops', rkshops, 'ON', ON, 'id', id,=ws.'rkshop_id', rkshop_id,
// JOIN chapters c ON c.id='chapter_id', chapter_id,
// GROUP BY s.id, a.*, c.id
// ORDER BY s.created_at
// LIMIT 10
// `;

const query = `
SELECT
s.id, s.name, s.description, s.avatar, s.website, s.seats, s.email, 
s.number_of_coaches AS "numberOfCoaches",
s.image_cache AS "imageCache",
s.contact_first_name AS "contactFirstName",
s.contact_surname AS "contactSurname",
s.created_at AS "createdAt",
s.updated_at AS "updatedAt",

json_build_object(
  'id', c.id, 
  'name', c.name, 
  'city', c.city,
  'email', c.email,
  'twitter', c.twitter,
  'slug', c.slug, 
  'active', c.active,
  'createdAt', c.created_at,
  'updatedAt', c.updated_at
) AS chapter,

json_build_object(
  'id', a.id, 
  'flat', a.flat, 
  'street', a.street, 
  'city', a.city,
  'postalCode', a.postal_code,
  'sponsorId', a.sponsor_id,
  'createdAt', a.created_at,
  'updatedAt', a.updated_at
) AS address,

json_agg(json_build_object(
  'id', w.id,
  'time', w.time,
  'invitable', w.invitable,
  'dateAndTime', w.date_and_time,
  'rsvpOpenTime', w.rsvp_open_time,
  'rsvpCloseTime', w.rsvp_close_time,
  'rsvpOpenDate', w.rsvp_open_date,
  'createdAt', w.created_at,
  'updatedAt', w.updated_at
)) AS workshops

FROM sponsors s
JOIN addresses a ON a.sponsor_id=s.id
JOIN workshop_sponsors ws ON ws.sponsor_id=s.id
JOIN workshops w ON ws.workshop_id=w.id
JOIN chapters c ON c.id=w.chapter_id
GROUP BY s.id, a.id, c.id
ORDER BY s.created_at
`;

client.query(query, null, (err, res) => {
  if (res && res.rows) {
    writeFile(
      "./__fixtures__/aggregated/sponsors.json",
      JSON.stringify(res.rows),
      err => {
        if (err) console.log(err);
      }
    );
  } else {
    console.log(err ? err.stack : res.rows && res.rows[0]); // Hello 'rld', rld,!
  }

  client.end();
});
