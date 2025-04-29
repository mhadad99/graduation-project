/** @format */

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Tabs, Tab, Alert } from "react-bootstrap";
import {
  Briefcase,
  PersonFill,
  Collection,
  Star,
  GeoAlt,
} from "react-bootstrap-icons";

// Import mock data
import { mockProfileData } from "../mock/profileData";

// Import profile components
import {
  ProfileHeader,
  ServicesTab,
  PortfolioTab,
  AboutTab,
  ReviewsTab,
  ProjectsTab,
} from "../components/profile";

const UserProfile = () => {
  const { id } = useParams();
  const loggedInUserId = "2"; // This should come from your auth state/context
  const isMyProfile = id === loggedInUserId;

  const getUserRole = (id) => {
    if (id === "1") return "freelancer";
    if (id === "2") return "client";
    if (id === "3") return "admin";
    return null;
  };

  const role = getUserRole(id);
  const profileData = role ? mockProfileData[role] : null;
  const [activeTab, setActiveTab] = useState("about");

  if (!profileData) {
    return (
      <Container className="py-5">
        <Alert variant="warning">User profile not found</Alert>
      </Container>
    );
  }

  const renderTabs = () => {
    const userRole = profileData?.role || "freelancer";

    const commonTabs = [
      {
        eventKey: "about",
        title: "About",
        icon: <PersonFill className="me-2" />,
        component: (
          <AboutTab profileData={profileData} isMyProfile={isMyProfile} />
        ),
      },
      {
        eventKey: "reviews",
        title: "Reviews",
        icon: <Star className="me-2" />,
        component: (
          <ReviewsTab reviews={profileData.reviews} isMyProfile={isMyProfile} />
        ),
      },
    ];

    const freelancerTabs = [
      {
        eventKey: "services",
        title: "Services",
        icon: <Briefcase className="me-2" />,
        component: (
          <ServicesTab
            services={profileData.services}
            isMyProfile={isMyProfile}
          />
        ),
      },
      {
        eventKey: "portfolio",
        title: "Portfolio",
        icon: <Collection className="me-2" />,
        component: (
          <PortfolioTab
            portfolioItems={profileData.portfolio}
            isMyProfile={isMyProfile}
          />
        ),
      },
      ...commonTabs,
    ];

    const clientTabs = [
      {
        eventKey: "projects",
        title: "Projects",
        icon: <Briefcase className="me-2" />,
        component: (
          <ProjectsTab
            projects={profileData.projects}
            isMyProfile={isMyProfile}
          />
        ),
      },
      ...commonTabs,
    ];

    return userRole === "freelancer" ? freelancerTabs : clientTabs;
  };

  return (
    <div className="bg-light min-vh-100">
      <ProfileHeader profileData={profileData} isMyProfile={isMyProfile} />
      <Container className="mt-4">
        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-4 custom-tab"
          justify>
          {renderTabs().map(({ eventKey, title, icon, component }) => (
            <Tab
              key={eventKey}
              eventKey={eventKey}
              title={
                <span className="d-flex align-items-center">
                  {icon}
                  {title}
                </span>
              }>
              {component}
            </Tab>
          ))}
        </Tabs>
      </Container>
    </div>
  );
};

export default UserProfile;
