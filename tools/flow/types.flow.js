type AuthService = {
  id: number,
  member_id: number,
  provider: string,
  uid: number,
  created_at: Date,
  updated_at: Date
};

type Address = {
  id: number,
  sponsor_id: number,
  flat: string,
  street: string,
  city: string,
  postal_code: string,
  created_at: Date,
  updated_at: Date
};

type Ban = {
  id: number,
  member_id: number,
  added_by_id: number,
  reason: string,
  note: string,
  explanation: string,
  permanent: boolean,
  expires_at: Date,
  created_at: Date,
  updated_at: Date
};

type Event = {
  id: number,
  venue_id: number,
  name: string,
  description: string,
  slug: string,
  schedule: string,
  coach_spaces: number,
  student_spaces: number,
  coach_questionnaire: string,
  student_questionnaire: string,
  coach_description: string,
  info: string,
  announce_only: boolean,
  url: string,
  email: string,
  invitable: boolean,
  tito_url: string,
  show_faq: string,
  audience: string,
  display_students: boolean,
  display_coaches: boolean,
  external_url: string,
  confirmation_required: boolean,
  surveys_required: boolean,
  date_and_time: Date,
  ends_at: Date,
  created_at: Date,
  updated_at: Date
};

type Feedback = {
  id: number,
  coach_id: number,
  tutorial_id: number,
  workshop_id: number,
  request: string,
  suggestions: string,
  rating: string,
  created_at: Date,
  updated_at: Date
};

type Group = {
  id: number,
  chapter_id: number,
  name: string,
  description: string,
  mailing_list_id: number,
  created_at: Date,
  updated_at: Date
};

type Job = {
  id: number,
  approved_by_id: number,
  created_by_id: number,
  title: string,
  description: string,
  location: string,
  expiry_date: string,
  email: string,
  link_to_job: string,
  approved: string,
  submitted: string,
  company: string,
  created_at: Date,
  updated_at: Date
};

type Member = {
  id: number,
  name: string,
  surname: string,
  email: string,
  twitter: string,
  about_you: string,
  mobile: string,
  pronouns: string,
  unsubscribed: boolean,
  received_coach_welcome_email: boolean,
  received_student_welcome_email: boolean,
  can_log_in: boolean,
  created_at: Date,
  updated_at: Date
};

type Sponsor = {
  id: number,
  name: string,
  description: string,
  avatar: string,
  website: string,
  email: string,
  seats: number,
  number_of_coaches: number,
  image_cache: string,
  contact_first_name: string,
  contact_surname: string,
  created_at: Date,
  updated_at: Date
};

type Tutorial = {
  id: number,
  workshop_id: number,
  title: string,
  description: string,
  url: string,
  created_at: Date,
  updated_at: Date
};

type Workshop = {
  id: number,
  chapter_id: number,
  title: string,
  description: string,
  invitable: boolean,
  sign_up_url: string,
  time: string,
  date_and_time: string,
  rsvp_close_time: string,
  random_allocate_at: Date,
  rsvp_open_time: Date,
  rsvp_open_date: Date,
  created_at: Date,
  updated_at: Date
};
