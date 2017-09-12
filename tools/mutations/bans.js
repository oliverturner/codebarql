import request from "../scripts/request";

const query = row => `
ban: createBan(
  dbId: ${row.id}
  dbCreatedAt: "${new Date(Date.parse(row.created_at)).toISOString()}"
  dbUpdatedAt: "${new Date(Date.parse(row.updated_at)).toISOString()}"
  reason: ${JSON.stringify(row.reason || "")}
  note: ${JSON.stringify(row.note || "")}
  explanation: ${JSON.stringify(row.explanation || "")}
  permanent: ${row.permanent}
  expiresAt: "${new Date(Date.parse(row.created_at)).toISOString()}"
) {
  id
}
`;

const createRecord = async row => {
  const result = await request(query(row));

  return {
    id: result.ban.id,
    dbId: row.id,
    dbMemberId: row.member_id,
    dbAadminId: row.added_by_id
  };
};

export default createRecord;
