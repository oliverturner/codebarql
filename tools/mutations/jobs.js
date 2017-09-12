import request from "../scripts/request";

const query = row => `
  job: createJob(
    dbId: ${row.id}
    dbCreatedAt: "${new Date(Date.parse(row.created_at)).toISOString()}"
    dbUpdatedAt: "${new Date(Date.parse(row.updated_at)).toISOString()}"
    title: ${JSON.stringify(row.title)}
    description: ${JSON.stringify(row.description)}
    location: ${JSON.stringify(row.location)}
    email: ${JSON.stringify(row.email)}
    linkToJob: ${JSON.stringify(row.link_to_job)}
    approved: ${row.approved === "t"}
    submitted: ${row.submitted === "t"}
    company: ${JSON.stringify(row.company)}
    expiryDate: "${new Date(Date.parse(row.expiry_date)).toISOString()}"
  ) {
    id
  }
`;

const createRecord = async row => {
  const result = await request(query(row));

  return {
    id: result.job.id,
    dbId: row.id
  };
};

export default createRecord;
