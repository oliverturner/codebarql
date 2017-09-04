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
//   s.id, s.name, s.description, s.avatar, s.website, s.seats, s.email, 
//   s.number_of_coaches AS "numberOfCoaches",
//   s.image_cache AS "imageCache",
//   s.contact_first_name AS "contactFirstName",
//   s.contact_surname AS "contactSurname",
//   s.created_at AS "createdAt",
//   s.updated_at AS "updatedAt",

//   row_to_json(
//     c.id, c.name, c.city, c.email, c.twitter, c.slug, c.active,
//     c.created_at AS "createdAt",
//     c.updated_at AS "updatedAt"
//   ) AS chapter,
  
//   row_to_json(
//     a.id, a.flat, a.street, a.city,
//     a.postal_code AS "postalCode",
//     a.sponsor_id AS "sponsorId",
//     a.created_at AS "createdAt",
//     a.updated_at AS "updatedAt"
//   ) AS address,
  
//   json_agg(DISTINCT 
//     w.id, w.title, w.description, w.time, w.invitable,
//     w.date_and_time AS "dateAndTime",
//     w.rsvp_open_time AS "rsvpOpenTime",
//     w.rsvp_close_time AS "rsvpCloseTime",
//     w.rsvp_open_date AS "rsvpOpenDate",
//     w.created_at AS "createdAt",
//     w.updated_at AS "updatedAt"
//   ) AS workshops
// FROM sponsors s
// JOIN addresses a ON a.sponsor_id=s.id
// JOIN workshop_sponsors ws ON ws.sponsor_id=s.id
// JOIN workshops w ON w.id=ws.workshop_id
// JOIN chapters c ON c.id=w.chapter_id
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
  ) AS chapter
FROM sponsors s
JOIN addresses a ON a.sponsor_id=s.id
JOIN workshop_sponsors ws ON ws.sponsor_id=s.id
JOIN workshops w ON w.id=ws.workshop_id
JOIN chapters c ON c.id=w.chapter_id
GROUP BY s.id, a.*, c.id
ORDER BY s.created_at
LIMIT 10
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
    console.log(err ? err.stack : res.rows && res.rows[0]); // Hello World!
  }

  client.end();
});
