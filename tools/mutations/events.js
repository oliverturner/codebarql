import request from "../scripts/request";

const query = row => `
  event: createEvent(
    dbId: ${row.id}
    dbCreatedAt: "${new Date(Date.parse(row.created_at)).toISOString()}"
    dbUpdatedAt: "${new Date(Date.parse(row.updated_at)).toISOString()}"
    name: ${JSON.stringify(row.name)}
    description: ${JSON.stringify(row.description || "")}
    dateAndTime: "${new Date(Date.parse(row.date_and_time)).toISOString()}"
    endsAt: "${new Date(Date.parse(row.ends_at)).toISOString()}"
    slug: ${JSON.stringify(row.slug)}
    schedule: ${JSON.stringify(row.schedule || "")}
    coachSpaces: ${row.coach_spaces || 0}
    studentSpaces: ${row.student_spaces || 0}
    coachQuestionnaire: ${JSON.stringify(row.coach_questionnaire)}
    studentQuestionnaire: ${JSON.stringify(row.student_questionnaire)}
    coachDescription: ${JSON.stringify(row.coach_description)}
    info: ${JSON.stringify(row.info || "")}
    announceOnly: ${row.announce_only}
    url: ${JSON.stringify(row.url)}
    email: ${JSON.stringify(row.email)}
    invitable: ${row.invitable}
    titoUrl: ${JSON.stringify(row.tito_url)}
    showFaq: ${!!row.show_faq}
    displayStudents: ${!!row.display_students}
    displayCoaches: ${!!row.display_coaches}
    externalUrl: ${JSON.stringify(row.external_url)}
    confirmationRequired: ${row.confirmation_required}
    surveysRequired: ${row.surveys_required}
    audience: ${JSON.stringify(row.audience)}
  ) {
    id
  }
`;

const createRecord = async row => {
  const result = await request(query(row));

  return {
    id: result.event.id,
    dbId: row.id
  };
};

export default createRecord;
