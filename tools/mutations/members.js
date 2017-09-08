import gqlClient from "./_client";

const createRecord = async s => {
  try {
    const result = await gqlClient.mutate(`{
      member: createMember(
        dbId: ${s.id}
        dbCreatedAt: "${new Date(Date.parse(s.created_at)).toISOString()}"
        dbUpdatedAt: "${new Date(Date.parse(s.updated_at)).toISOString()}"
        firstname: "${s.name}"
        surname: "${s.surname}"
        email: "${s.email}"
        mobile: "${s.mobile}"
        twitter: "${s.twitter}"
        pronouns: "${s.pronouns}"
        receivedCoachWelcomeEmail: ${s.received_coach_welcome_email}
        receivedStudentWelcomeEmail: ${s.received_student_welcome_email}
        canLogIn: ${s.can_log_in}
      ) {
        id
      }
    }`);

    return result.member.id;
  } catch (e) {
    console.log(e);
  }
};

export default createRecord;
