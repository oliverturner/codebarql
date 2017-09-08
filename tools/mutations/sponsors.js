import gqlClient from "./_client";

const createRecord = async s => {
  try {
    const result = await gqlClient.mutate(`{
      sponsor: createSponsor(
        dbId: ${s.id}
        dbCreatedAt: "${new Date(Date.parse(s.created_at)).toISOString()}"
        dbUpdatedAt: "${new Date(Date.parse(s.updated_at)).toISOString()}"
        name: "${s.name}"
        description: "${s.description}"
        avatar: "${s.avatar}"
        website: "${s.website}"
        seats: ${s.seats}
        imageCache: "${s.image_cache}"
        numberOfCoaches: ${s.number_of_coaches ? s.number_of_coaches : 0}
        email: "${s.email}"
        contactFirstname: "${s.contact_first_name || ""}"
        contactSurname: "${s.contact_surname || ""}"
      ) {
        id
      }
    }`);

    return result.sponsor.id;
  } catch (e) {
    console.log(e);
  }
};

export default createRecord;
