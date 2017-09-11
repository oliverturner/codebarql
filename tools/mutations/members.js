import gqlClient from "./_client";

const createRecord = async row => {
  try {
    const result = await gqlClient.mutate(`{
      member: createMember(
        dbId: ${row.id}
        dbCreatedAt: "${new Date(Date.parse(row.created_at)).toISOString()}"
        dbUpdatedAt: "${new Date(Date.parse(row.updated_at)).toISOString()}"
        firstname: "${row.name}"
        surname: "${row.surname}"
        email: "${row.email}"
        mobile: "${row.mobile}"
        twitter: "${row.twitter}"
        pronouns: "${row.pronouns}"
        receivedCoachWelcomeEmail: ${row.received_coach_welcome_email}
        receivedStudentWelcomeEmail: ${row.received_student_welcome_email}
        canLogIn: ${row.can_log_in}
      ) {
        id
      }
    }`);

    return { 
      id: result.member.id,
      dbId: row.id
    };
  } catch (e) {
    console.log(e);
  }
};

export default createRecord;
