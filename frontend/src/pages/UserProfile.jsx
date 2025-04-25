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
} from "../components/profile";

const UserProfile = () => {
  const { userId } = useParams();

  // Local state
  const [activeTab, setActiveTab] = useState("about");
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate API call with mock data
  useEffect(() => {
    const loadMockData = () => {
      // Simulate network delay
      setTimeout(() => {
        // For demo, always load freelancer profile
        setProfileData(mockProfileData.freelancer);
        setIsLoading(false);
        // Set isMyProfile based on URL param
        setIsMyProfile(userId === "1"); // Assuming ID 1 is the logged-in user
      }, 1000);
    };

    loadMockData();
  }, [userId]);

  // Mock handlers
  const handleAddPortfolioItem = (item) => {
    console.log("Adding portfolio item:", item);
    // You would normally dispatch to Redux here
  };

  const handleDeletePortfolioItem = (itemId) => {
    console.log("Deleting portfolio item:", itemId);
    // You would normally dispatch to Redux here
  };

  const handleSubmitReview = (review) => {
    console.log("Submitting review:", review);
    // You would normally dispatch to Redux here
  };

  if (isLoading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading profile data...</p>
      </Container>
    );
  }

  if (!profileData) {
    return (
      <Container className="py-5">
        <Alert variant="warning">User profile not found</Alert>
      </Container>
    );
  }

  const renderRoleBasedTabs = () => {
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
          <ReviewsTab
            reviews={profileData.reviews}
            onSubmitReview={handleSubmitReview}
            isMyProfile={isMyProfile}
          />
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
            portfolio={profileData.portfolio}
            isMyProfile={isMyProfile}
            onAdd={handleAddPortfolioItem}
            onDelete={handleDeletePortfolioItem}
          />
        ),
      },
    ];

    return userRole === "freelancer"
      ? [...freelancerTabs, ...commonTabs]
      : commonTabs;
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
          {renderRoleBasedTabs().map(({ eventKey, title, icon, component }) => (
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
