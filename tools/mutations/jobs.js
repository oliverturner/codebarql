import gqlClient from "./_client";

const createRecord = async s => {
  try {
    const result = await gqlClient.mutate(`{
      job: createJob(
        dbId: ${s.id}
        dbCreatedAt: "${new Date(Date.parse(s.created_at)).toISOString()}"
        dbUpdatedAt: "${new Date(Date.parse(s.updated_at)).toISOString()}"
        title: "${s.title}"
        description: "${s.description}"
        location: "${s.location}"
        email: "${s.email}"
        linkToJob: "${s.link_to_job}"
        approved: ${s.approved === "t"}
        submitted: ${s.submitted === "t"}
        company: "${s.company}"
        expiryDate: "${new Date(Date.parse(s.expiry_date)).toISOString()}"
      ) {
        id
      }
    }`);

    return result && result.job.id;
  } catch (e) {
    console.log(e);
  }
};

export default createRecord;
