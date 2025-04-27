/** @format */

export const mockProfileData = {
  freelancer: {
    id: 1,
    name: "Ayman Samir",
    title: "Full Stack Developer",
    role: "admin",
    profileImage: "https://i.imgur.com/6AglEUF.jpeg",
    location: "Cairo, Egypt",
    status: "online",
    rating: 4.8,
    reviewCount: 127,
    completionRate: 98,
    responseTime: "1 hour",
    bio: "Experienced full stack developer with 5+ years of experience in web development...",
    skills: ["React", "Node.js", "MongoDB", "Express", "TypeScript"],
    languages: [
      { name: "English", level: "Fluent" },
      { name: "Arabic", level: "Native" },
    ],
    education: [
      {
        degree: "Bachelor of Computer Science",
        school: "Cairo University",
        year: "2019",
      },
    ],
    services: [
      {
        id: 1,
        title: "Full Stack Web Development",
        description:
          "Custom web applications using MERN stack with responsive design, API integration, and database management. Specializing in scalable solutions for businesses.",
        price: 500,
        image: "https://picsum.photos/300/200",
        rating: 4.9,
        reviewCount: 45,
        deliveryTime: "7 days",
        status: "active",
        languages: [
          { name: "English", level: "Fluent" },
          { name: "Arabic", level: "Native" },
        ],
      },
      {
        id: 2,
        title: "React Frontend Development",
        description:
          "Modern React applications with Redux, custom hooks, and responsive UI/UX design. Including performance optimization and SEO best practices.",
        price: 300,
        image: "https://picsum.photos/300/201",
        rating: 4.8,
        reviewCount: 32,
        deliveryTime: "5 days",
        status: "active",
        languages: [{ name: "English", level: "Fluent" }],
      },
      {
        id: 3,
        title: "API Development",
        description:
          "RESTful API development using Node.js and Express with MongoDB integration. Including authentication, authorization, and documentation.",
        price: 400,
        image: "https://picsum.photos/300/202",
        rating: 4.7,
        reviewCount: 28,
        deliveryTime: "6 days",
        status: "pending",
        languages: [
          { name: "English", level: "Fluent" },
          { name: "Arabic", level: "Native" },
        ],
      },
    ],
    portfolio: [
      {
        id: 1,
        title: "E-commerce Platform",
        description: "Built a full-featured e-commerce platform",
        image: "https://picsum.photos/300/200",
        link: "https://example.com",
      },
      // Add more portfolio items...
    ],
    reviews: [
      {
        id: 1,
        author: "Omar Ahmed",
        rating: 5,
        comment: "Excellent work and communication!",
        date: "2024-03-15",
      },
      // Add more reviews...
    ],
  },
  client: {
    id: 2,
    name: "Sarah Saied",
    title: "Project Manager",
    role: "client",
    profileImage: "https://i.imgur.com/7D8wF.jpeg",
    location: "Alexandria, Egypt",
    status: "offline",
    bio: "Project manager with focus on digital transformation...",
    projects: [
      {
        id: 1,
        title: "Website Redesign",
        status: "In Progress",
        budget: "$3000",
        deadline: "2024-05-01",
      },
      // Add more projects...
    ],
    reviews: [
      {
        id: 1,
        author: "Hassan Ali",
        rating: 5,
        comment: "Great client to work with!",
        date: "2024-02-20",
      },
      // Add more reviews...
    ],
  },
};
