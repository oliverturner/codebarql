import { query } from "../members";

test("query", () => {
  const row = {
    id: "8",
    name: "Imelda",
    surname: "Maguire",
    email: "imelda_maguire@hotmail.com",
    twitter: "imeldamaguire",
    about_you:
      "Have done some HTML and CSS, currently learning JavaScript. Currently working in a data analyst role so trying to get good at that too.\r\n\r\nI also like performing with fire!",
    created_at: "2013-10-21 05:15:05.702928",
    updated_at: "2016-01-29 16:29:24.472508",
    unsubscribed: "",
    can_log_in: "t",
    mobile: "",
    received_coach_welcome_email: "f",
    received_student_welcome_email: "t",
    pronouns: "(she/her)"
  };

  const dto = `{
    member: createMember(
      dbId: 8
      dbCreatedAt: "2013-10-21T04:15:05.702Z"
      dbUpdatedAt: "2016-01-29T16:29:24.472Z"
      firstname: "Imelda"
      surname: "Maguire"
      about: "Have done some HTML and CSS, currently learning JavaScript. Currently working in a data analyst role so trying to get good at that too.\r\n\r\nI also like performing with fire!"
      email: "imelda_maguire@hotmail.com"
      mobile: ""
      twitter: "imeldamaguire"
      pronouns: "(she/her)"
      receivedCoachWelcomeEmail: false
      receivedStudentWelcomeEmail: true
      canLogIn: true
    ) {
      id
    }    
  }`;
  expect(query(row)).toEqual(dto);
});
