/** @format */

export const categories = [
  {
    name: "All Services",
    icon: "grid",
  },
  {
    name: "Design & Creative",
    icon: "palette",
    subcategories: [
      "Logo Design",
      "Web Design",
      "UX/UI Design",
      "Brand Identity",
    ],
  },
  {
    name: "Development & IT",
    icon: "code",
    subcategories: [
      "Web Development",
      "Mobile Apps",
      "WordPress",
      "E-commerce",
    ],
  },
  {
    name: "Digital Marketing",
    icon: "graph-up",
    subcategories: [
      "Social Media",
      "SEO",
      "Content Marketing",
      "Email Marketing",
    ],
  },
  {
    name: "Writing & Translation",
    icon: "pencil",
    subcategories: [
      "Article Writing",
      "Translation",
      "Copywriting",
      "Proofreading",
    ],
  },
];

export const servicesData = [
  {
    id: 1,
    title: "Professional Logo Design",
    description: "Custom logo design with unlimited revisions",
    price: 99,
    rating: 4.9,
    reviewCount: 128,
    deliveryTime: "2-3 days",
    image: "https://images.unsplash.com/photo-1559028012-481c04fa702d",
    category: "Design & Creative",
    subcategory: "Logo Design",
    freelancer: {
      id: 1,
      name: "John Doe",
      avatar: "/images/avatars/john.jpg",
      level: "Top Rated",
      totalProjects: 156,
      responseTime: "1 hour",
    },
  },
  {
    id: 2,
    title: "Full-Stack Web Development",
    description: "Modern web applications with React and Node.js",
    price: 299,
    rating: 4.8,
    reviewCount: 94,
    deliveryTime: "7-10 days",
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159",
    category: "Development & IT",
    subcategory: "Web Development",
    freelancer: {
      id: 2,
      name: "Sarah Wilson",
      avatar: "/images/avatars/sarah.jpg",
      level: "Level 2",
      totalProjects: 89,
      responseTime: "2 hours",
    },
  },
  {
    id: 3,
    title: "Full-Stack Web Development",
    description: "Modern web applications with React and Node.js",
    price: 299,
    rating: 4.8,
    reviewCount: 94,
    deliveryTime: "7-10 days",
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159",
    category: "Development & IT",
    subcategory: "Web Development",
    freelancer: {
      id: 3,
      name: "Sarah Wilson",
      avatar: "/images/avatars/sarah.jpg",
      level: "Level 2",
      totalProjects: 89,
      responseTime: "2 hours",
    },
  },
  // Add more services...
];
