import gqlClient from "./_client";

const createRecord = async s => {
  try {
    const result = await gqlClient.mutate(`{
      ban: createBan(
        dbId: ${s.id}
        dbCreatedAt: "${new Date(Date.parse(s.created_at)).toISOString()}"
        dbUpdatedAt: "${new Date(Date.parse(s.updated_at)).toISOString()}"
        reason: "${s.reason}"
        note: "${s.note}"
        explanation: "${s.explanation}"
        permanent: ${s.permanent}
        expiresAt: "${new Date(Date.parse(s.created_at)).toISOString()}"
      ) {
        id
      }
    }`);

    return result.ban.id;
  } catch (e) {
    console.log(e);
  }
};

export default createRecord;
