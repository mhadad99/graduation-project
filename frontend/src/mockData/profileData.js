export const mockUserData = {
  freelancer: {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'freelancer',
    avatar: '/avatars/freelancer.jpg',
    bio: 'Professional web developer with 5 years of experience',
    skills: ['React', 'Node.js', 'TypeScript'],
    hourlyRate: 45,
    expertise: 'expert',
    portfolio: [],
    rating: 4.8
  },
  client: {
    id: '2',
    name: 'Sarah Smith',
    email: 'sarah@company.com',
    role: 'client',
    avatar: '/avatars/client.jpg',
    bio: 'Project Manager at Tech Solutions',
    company: 'Tech Solutions Inc.',
    industry: 'Software Development',
    projectsPosted: 12
  },
  admin: {
    id: '3',
    name: 'Admin User',
    email: 'admin@platform.com',
    role: 'admin',
    avatar: '/avatars/admin.jpg',
    bio: 'Platform Administrator',
    permissions: ['user_management', 'content_moderation']
  }
};
