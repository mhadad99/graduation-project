/** @format */

import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import * as Icons from "react-bootstrap-icons";
import ServicesSection from "./sections/ServicesSection";
import AboutSection from "./sections/AboutSection";
import PortfolioSection from "./sections/PortfolioSection";
import ReviewsSection from "./sections/ReviewsSection";
import ProjectsSection from "./sections/ProjectsSection";
import AdminDashboardSection from "./sections/AdminDashboardSection";
import AboutTab from "./AboutTab";

const ProfileTabs = ({ tabs, isProfileOwner, userRole, userData }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.key);

  const renderTabContent = (tabKey) => {
    switch (tabKey) {
      case "about":
        return (
          <AboutTab
            isProfileOwner={isProfileOwner}
            userRole={userRole}
            userData={userData} // Pass user data from your state/API
          />
        );
      default:
        const components = {
          services: ServicesSection,
          about: AboutSection,
          portfolio: PortfolioSection,
          reviews: ReviewsSection,
          projects: ProjectsSection,
          dashboard: AdminDashboardSection,
        };

        const Component = components[tabKey];
        return Component ? (
          <Component isProfileOwner={isProfileOwner} userRole={userRole} />
        ) : null;
    }
  };

  return (
    <Tabs
      activeKey={activeTab}
      onSelect={(k) => setActiveTab(k)}
      className="mb-4 custom-tab"
      justify>
      {tabs.map(({ key, title, icon }) => (
        <Tab
          key={key}
          eventKey={key}
          title={
            <span>
              {React.createElement(Icons[icon], { className: "me-2" })}
              {title}
            </span>
          }>
          {renderTabContent(key)}
        </Tab>
      ))}
    </Tabs>
  );
};

export default ProfileTabs;
