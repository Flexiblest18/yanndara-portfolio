export interface ExperienceItem {
  role: string;
  company: string;
  date: string;
  location: string;
  type: string;
  points: string[];
  current?: boolean;
}

// Edit this array to update the Experience timeline.
export const experience: ExperienceItem[] = [
  {
    role: 'IT Helpdesk Intern',
    company: 'NagaWorld',
    date: '2026 – Present',
    location: 'Phnom Penh, Cambodia',
    type: 'IT Support',
    points: [
      'Provided first-level IT support to users by troubleshooting hardware, software, and system issues.',
      'Responded to IT support requests and assisted users with technical problems.',
      'Assisted with Microsoft Office, Outlook, printer, and application troubleshooting.',
      'Supported network connectivity troubleshooting, including Wi-Fi, LAN, and network port issues.',
      'Coordinated with IT teams to escalate technical issues and ensure timely resolution.'
    ]
  },
  {
    role: 'Bank Executive Trainee – Teller 6 months',
    company: 'Maybank Cambodia',
    date: 'Oct-2022 – March-2023',
    location: 'Serey Sophon Branch, Banteay Meanchey',
    type: 'Banking Operations',
    points: [
      'Processed customer transactions, including deposits, withdrawals, and fund transfers.',
      'Followed banking procedures and internal policies to ensure transaction accuracy.',
      'Assisted customers with banking services and general inquiries.',
      'Verified cash balances and maintained accurate transaction records.',
      'Developed strong customer service, communication, and problem-solving skills.'
    ]
  }
];

export const profile = {
  name: 'Chhun Yanndara',
  roles: 'IT Support Specialist  |  Junior Network & System Administrator',
  summary: 'A motivated and responsible Information Technology graduate from SETEC Institute with practical experience in IT Support and Helpdesk operations. Skilled in troubleshooting hardware, software, and network connectivity issues, assisting end users, and maintaining IT equipment. Knowledgeable in Windows and Linux environments, software installation, user account management, and network devices, including routers, switches, and access points. A quick learner with strong problem-solving, communication, and teamwork skills, committed to providing reliable technical support and ensuring smooth IT operations.',
  email: 'chhunyanndara18@gmail.com',
  phone: '+855 16 365 193',
  linkedin: 'https://www.linkedin.com/in/yanndara-chhun-a568662a6/',
  linkedinLabel: 'Profile Link In',
  telegram: 'https://t.me/yanndarachhun',
  telegramLabel: '@yanndarachhun',
  profileImage: '/Dara.jpg',
  location: 'Phnom Penh, Cambodia',
  cvPath: '/Chhun_Yanndara_CV.pdf'
};
