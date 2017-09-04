type File = {
  id: number,
  name: string,
  contentType: string,
  url: string,
  secret: string,
  size: number,
  createdAt: Date,
  updatedAt: Date
}

type User implements Node {
  id: number,
  auth0UserId: string,
  createdAt: Date,
  updatedAt: Date
}

type Address = {
  id: number,
  sponsor: ?Sponsor,
  flat: string,
  street: string,
  city: string,
  postalCode: string,
  createdAt: Date,
  updatedAt: Date
};

type Sponsor implements Node {
  id: number,
  name: string,
  description: string,
  avatar: string,
  website: string,
  email: string,
  address: Address,
  seats: number,
  jobs: Array<Job>,
  workshops: Array<Workshop>,
  chapter: Chapter,
  numberOfCoaches: number,
  imageCache: string,
  contactFirstname: string,
  contactSurname: string,
  createdAt: Date,
  updatedAt: Date
}

type Chapter implements Node {
  id: number,
  name: string,
  city: string,
  email: string,
  twitter: string,
  slug: string,
  active: boolean,
  workshops: Array<Workshop>,
  members: Array<Member>,
  sponsors: Array<Sponsor>,
  createdAt: Date,
  updatedAt: Date
}

type Workshop implements Node {
  id: number,
  chapter: Chapter,
  attendees: Array<Member>,
  sponsor: Sponsor,
  invitable: boolean,
  time: Date,
  dateAndTime: Date,
  rsvpCloseTime: Date,
  rsvpOpenTime: Date,
  rsvpOpenDate: Date,
  createdAt: Date,
  updatedAt: Date
}

type Member implements Node {
  id: number,
  firstname: string,
  surname: string,
  email: string,
  mobile: string,
  twitter: string,
  aboutYou: string,
  pronouns: string,
  role: Role,
  subscriptions: Array<Chapter>,,
  workshopsAttended: Array<Workshop>,
  jobApprovals: Array<Job>,
  jobPostings: Array<Job>,
  bans: Array<Ban>,
  adminBans: Array<Ban>,
  receivedCoachWelcomeEmail: boolean,
  receivedStudentWelcomeEmail: boolean,
  canLogIn: boolean,
  createdAt: Date,
  updatedAt: Date
}

type Role implements Node {
  id: number,
  name: string,
  members: Array<Member>,
  createdAt: Date,
  updatedAt: Date
}

type Job implements Node {
  id: number,
  approvedBy: Member,
  createdBy: Member,
  title: string,
  description: string,
  location: string,
  email: string,
  linkToJob: string,
  approved: boolean,
  submitted: boolean,
  company: Sponsor,
  expiryDate: Date,
  createdAt: Date,
  updatedAt: Date
}

type Ban implements Node {
  id: number,
  member: Member,
  admin: Member,
  reason: string,
  note: string,
  explanation: string,
  permanent: boolean,
  expiresAt: Date,
  createdAt: Date,
  updatedAt: Date
}