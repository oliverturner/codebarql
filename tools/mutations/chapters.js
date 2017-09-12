import request from "../scripts/request";

const query = row => `
chapter: createChapter(
  dbId: ${row.id}
  dbCreatedAt: "${new Date(Date.parse(row.created_at)).toISOString()}"
  dbUpdatedAt: "${new Date(Date.parse(row.updated_at)).toISOString()}"
  name: ${JSON.stringify(row.name)}
  city: ${JSON.stringify(row.city)}
  email: ${JSON.stringify(row.email)}
  twitter: ${JSON.stringify(row.twitter)}
  slug: ${JSON.stringify(row.slug)}
  active: ${row.active === "t"}
) {
  id
}
`;

const createRecord = async row => {
  const result = await request(query(row));

  return {
    id: result.chapter.id,
    dbId: row.id
  };
};

export default createRecord;
