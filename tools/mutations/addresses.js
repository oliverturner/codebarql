import gqlClient from "./_client";

const createRecord = async row => {
  const result = await gqlClient.mutate(`{
    address: createAddress(
      dbId: ${row.id}
      dbCreatedAt: "${new Date(Date.parse(row.created_at)).toISOString()}"
      dbUpdatedAt: "${new Date(Date.parse(row.updated_at)).toISOString()}"
      flat: "${row.flat}"
      street: "${row.street}"
      city: "${row.city}"
      postalCode: "${row.postal_code}"
    ) {
      id
    }
  }`);

  return result.address.id;
};

export default createRecord;
