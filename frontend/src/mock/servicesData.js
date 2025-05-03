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
    description:
      "Custom logo design with unlimited revisions. Get a unique and memorable logo that represents your brand identity. Includes source files and full commercial rights.",
    price: 99,
    rating: 4.9,
    reviewCount: 128,
    deliveryTime: "2-3 days",
    image: "https://images.unsplash.com/photo-1559028012-481c04fa702d",
    category: "Design & Creative",
    subcategory: "Logo Design",
    tags: ["Logo Design", "Branding", "Vector", "Modern"],
    youtubeUrl: "https://www.youtube.com/watch?v=eaqb832pXCo",
    galleryImages: [
      "https://images.unsplash.com/photo-1626785774573-4b799315345d",
      "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9",
      "https://images.unsplash.com/photo-1626785774573-4b799315345d",
      "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9",
    ],
    freelancer: {
      id: 1,
      name: "John Doe",
      avatar: "https://i.pravatar.cc/300?img=12",
      level: "Top Rated",
      totalProjects: 156,
      responseTime: "1 hour",
      description:
        "Professional graphic designer with 8+ years of experience in brand identity and logo design.",
      skills: ["Adobe Illustrator", "Photoshop", "Brand Design", "Typography"],
    },
  },
  {
    id: 2,
    title: "Full-Stack Web Development",
    description:
      "Modern web applications with React and Node.js. Complete end-to-end development including database design, API development, and responsive frontend implementation.",
    price: 299,
    rating: 4.8,
    reviewCount: 94,
    deliveryTime: "7-10 days",
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159",
    category: "Development & IT",
    subcategory: "Web Development",
    tags: ["React", "Node.js", "MongoDB", "Full-Stack"],
    youtubeUrl: "https://www.youtube.com/watch?v=N57RbkGyqu8",
    galleryImages: [
      "https://images.unsplash.com/photo-1547658719-da2b51169166",
      "https://images.unsplash.com/photo-1551033406-611cf9a28f67",
      "https://images.unsplash.com/photo-1593720213428-28a5b9e94613",
    ],
    freelancer: {
      id: 2,
      name: "Sarah Wilson",
      avatar: "https://i.pravatar.cc/300?img=25",
      level: "Level 2",
      totalProjects: 89,
      responseTime: "2 hours",
      description:
        "Full-stack developer specializing in React and Node.js. Creating scalable web applications with modern technologies.",
      skills: ["React", "Node.js", "MongoDB", "Express", "AWS"],
    },
  },
  // ... keep other services with similar structure
];
