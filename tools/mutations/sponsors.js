import request from "../scripts/request";

const query = row => `
  sponsor: createSponsor(
    dbId: ${row.id}
    dbCreatedAt: "${new Date(Date.parse(row.created_at)).toISOString()}"
    dbUpdatedAt: "${new Date(Date.parse(row.updated_at)).toISOString()}"
    name: ${JSON.stringify(row.name)}
    description: ${JSON.stringify(row.description)}
    avatar: ${JSON.stringify(row.avatar)}
    website: ${JSON.stringify(row.website)}
    seats: ${row.seats}
    imageCache: ${JSON.stringify(row.image_cache)}
    numberOfCoaches: ${row.number_of_coaches ? row.number_of_coaches : 0}
    email: ${JSON.stringify(row.email)}
    contactFirstname: ${JSON.stringify(row.contact_first_name || "")}
    contactSurname: ${JSON.stringify(row.contact_surname || "")}
  ) {
    id
  }
`;

const createRecord = async row => {
  const result = await request(query(row));

  return {
    id: result.sponsor.id,
    dbId: row.id
  };
};

export default createRecord;
