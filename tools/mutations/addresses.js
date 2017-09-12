import request from "../scripts/request";

const query = row => `
address: createAddress(
  dbId: ${row.id}
  dbCreatedAt: "${new Date(Date.parse(row.created_at)).toISOString()}"
  dbUpdatedAt: "${new Date(Date.parse(row.updated_at)).toISOString()}"
  flat: ${JSON.stringify(row.flat || "")}
  street: ${JSON.stringify(row.street || "")}
  city: ${JSON.stringify(row.city || "")}
  postalCode: ${JSON.stringify(row.postal_code || "")}
) {
  id
}
`;

const createRecord = async row => {
  const result = await request(query(row));

  return {
    id: result.address.id,
    dbId: row.id
  };
};

export default createRecord;
