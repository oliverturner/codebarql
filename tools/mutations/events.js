import gqlClient from "./_client";

const createRecord = async row => {
  try {
    const result = await gqlClient.mutate(`{
      event: createEvent(
        dbId: ${row.id}
        dbCreatedAt: "${new Date(Date.parse(row.created_at)).toISOString()}"
        dbUpdatedAt: "${new Date(Date.parse(row.updated_at)).toISOString()}"
        name: "${row.name}"
        description: "${row.description}"
        dateAndTime: "${new Date(Date.parse(row.date_and_time)).toISOString()}"
        endsAt: "${new Date(Date.parse(row.ends_at)).toISOString()}"
        slug: "${row.slug}"
        schedule: "${row.schedule}"
        coachSpaces: ${row.coach_spaces}
        studentSpaces: ${row.student_spaces}
        coachQuestionnaire: "${row.coach_questionnaire}"
        studentQuestionnaire: "${row.student_questionnaire}"
        coachDescription: "${row.coach_description}"
        info: "${row.info}"
        announceOnly: ${row.announce_only}
        url: "${row.url}"
        email: "${row.email}"
        invitable: ${row.invitable}
        titoUrl: "${row.tito_url}"
        showFaq: ${!!row.show_faq}
        displayStudents: ${!!row.display_students}
        displayCoaches: ${!!row.display_coaches}
        externalUrl: "${row.external_url}"
        confirmationRequired: ${row.confirmation_required}
        surveysRequired: ${row.surveys_required}
        audience: "${row.audience}"
      ) {
        id
      }
    }`);

    console.log(result)

    return result.event.id;
  } catch (e) {
    console.log(e);
  }
};

export default createRecord;
