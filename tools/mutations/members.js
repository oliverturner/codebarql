import request from "../scripts/request";

export const query = row => `
  member: createMember(
    dbId: ${row.id}
    dbCreatedAt: "${new Date(Date.parse(row.created_at)).toISOString()}"
    dbUpdatedAt: "${new Date(Date.parse(row.updated_at)).toISOString()}"
    firstname: ${JSON.stringify(row.name)}
    surname: ${JSON.stringify(row.surname)}
    about: ${JSON.stringify(row.about_you)}
    email: ${JSON.stringify(row.email)}
    mobile: ${JSON.stringify(row.mobile)}
    twitter: ${JSON.stringify(row.twitter)}
    pronouns: ${JSON.stringify(row.pronouns)}
    receivedCoachWelcomeEmail: ${row.received_coach_welcome_email === "t"}
    receivedStudentWelcomeEmail: ${row.received_student_welcome_email === "t"}
    canLogIn: ${row.can_log_in === "t"}
  ) {
    id
  }
`;

const createRecord = async row => {
  const result = await request(query(row));

  return {
    id: result.member.id,
    dbId: row.id
  };
};

export const getAll = `query getMembers {
  items: allMembers(first: 100) { id }
}`;

export const deleteItem = item => (`{
  deleteMember(id: "${item.id}") { id }
}`)

export const itemMeta = `{
  meta: _allMembersMeta { count }
}`

export default createRecord;
