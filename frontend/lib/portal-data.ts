export type Exco = {
  id: number;
  name: string;
  role: string;
  set: string;
  occupation: string;
  status: 'Active' | 'Outgoing';
};

export const member = {
  name: 'Adeola Akindele',
  initials: 'AA',
  memberId: 'ICGS-OSA/98/0142',
  set: 'Class of 1998',
  position: 'Senior Project Manager',
  company: 'Civic Works Nigeria',
  location: 'Lagos, Nigeria',
  completion: 82,
};

export const activities = [
  { title: 'Registered for 2026 Alumni Homecoming', meta: 'Event registration', date: '08 Aug 2026', tone: 'blue' },
  { title: 'Profile information updated', meta: 'Account activity', date: '26 Jul 2026', tone: 'gold' },
  { title: '₦50,000 contributed to Library Project', meta: 'Development fund', date: '12 Jun 2026', tone: 'green' },
  { title: 'Membership application approved', meta: 'Member since 2024', date: '04 Feb 2024', tone: 'navy' },
];

export const excos: Exco[] = [
  { id: 1, name: 'Dr. Olumide Akinyemi', role: 'President', set: '1989 Set', occupation: 'Medical Director', status: 'Active' },
  { id: 2, name: 'Mrs. Bisi Adekunle', role: 'Vice President', set: '1992 Set', occupation: 'Education Consultant', status: 'Active' },
  { id: 3, name: 'Mr. Tunde Adebayo', role: 'General Secretary', set: '1997 Set', occupation: 'Legal Practitioner', status: 'Active' },
  { id: 4, name: 'Mrs. Ronke Oladipo', role: 'Treasurer', set: '1995 Set', occupation: 'Chartered Accountant', status: 'Active' },
];

export const recentMembers = [
  ['Temilade Fasanya', '2004 Set', 'Lagos', 'Verified'],
  ['Samuel Akinola', '1996 Set', 'Abuja', 'Pending'],
  ['Funmi Olasehinde', '2001 Set', 'Akure', 'Verified'],
  ['David Oluwaseun', '2010 Set', 'London', 'Pending'],
];

export const sets = [
  { year: '1989', members: 74, admin: 'Dr. Olumide Akinyemi', pending: 2, status: 'Active' },
  { year: '1992', members: 91, admin: 'Mrs. Bisi Adekunle', pending: 5, status: 'Active' },
  { year: '1998', members: 126, admin: 'Mr. Kayode Arowolo', pending: 8, status: 'Active' },
  { year: '2004', members: 108, admin: 'Not assigned', pending: 11, status: 'Needs admin' },
  { year: '2010', members: 83, admin: 'Miss. Lara Oladimeji', pending: 4, status: 'Active' },
];

export const setMembers = [
  { name: 'Adeola Akindele', initials: 'AA', position: 'Senior Project Manager', location: 'Lagos, Nigeria', joined: '2024' },
  { name: 'Kayode Arowolo', initials: 'KA', position: 'Business Consultant', location: 'Akure, Nigeria', joined: '2023' },
  { name: 'Morenike Adeyemi', initials: 'MA', position: 'Public Health Specialist', location: 'Abuja, Nigeria', joined: '2025' },
  { name: 'Femi Olatunji', initials: 'FO', position: 'Civil Engineer', location: 'Calgary, Canada', joined: '2024' },
  { name: 'Bolanle Okeowo', initials: 'BO', position: 'School Proprietor', location: 'Ibadan, Nigeria', joined: '2022' },
  { name: 'Segun Akinrinsola', initials: 'SA', position: 'Software Architect', location: 'London, UK', joined: '2025' },
];

export const pendingSetMembers = [
  ['Yemi Adegoke', 'yemi.adegoke@example.com', 'Lagos', '05 Aug 2026'],
  ['Sade Oluwole', 'sade.oluwole@example.com', 'Akure', '02 Aug 2026'],
  ['Dayo Akinpelu', 'dayo.akinpelu@example.com', 'Abuja', '29 Jul 2026'],
];
