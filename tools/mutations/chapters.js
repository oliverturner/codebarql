import gqlClient from "./_client";

const createRecord = async row => {
  try {
    const result = await gqlClient.mutate(`{
      chapter: createChapter(
        dbId: ${row.id}
        dbCreatedAt: "${new Date(Date.parse(row.created_at)).toISOString()}"
        dbUpdatedAt: "${new Date(Date.parse(row.updated_at)).toISOString()}"
        name: "${row.name}"
        city: "${row.city}"
        email: "${row.email}"
        twitter: "${row.twitter}"
        slug: "${row.slug}"
        active: ${row.active === "t"}
      ) {
        id
      }
    }`);

    return { 
      id: result.chapter.id,
      dbId: row.id
    };
  } catch (e) {
    console.log(e);
  }
};

export default createRecord;
