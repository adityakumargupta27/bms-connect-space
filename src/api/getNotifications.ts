export const getNotifications = () => [
  {
    id: 1,
    title: "New Hackathon Announced",
    description: "Join the 'Code & Create' hackathon this weekend! Prizes worth $5,000.",
    date: new Date(2024, 6, 15),
    icon: "Trophy",
    slug: "code-and-create-hackathon",
    path: "/official",
  },
  {
    id: 2,
    title: "Club Registrations Open",
    description: "The official BMSCE clubs are now accepting new members. Find your community!",
    date: new Date(2024, 6, 12),
    icon: "Users",
    slug: "club-registrations",
    path: "/official",
  },
  {
    id: 3,
    title: "Upcoming Tech Talk: AI in Medicine",
    description: "Dr. Ananya Sharma will be giving a talk on the future of AI in the medical field.",
    date: new Date(2024, 6, 10),
    icon: "Calendar",
    slug: "tech-talk-ai-medicine",
  },
];
