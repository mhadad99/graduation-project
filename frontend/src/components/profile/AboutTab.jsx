/** @format */

import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Badge,
  ListGroup,
  ProgressBar,
  Button,
  Form,
} from "react-bootstrap";
import {
  CheckCircleFill,
  PatchCheck,
  Calendar,
  Clock,
  File,
  Phone,
  Envelope,
  Bookmark,
  Github,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  GeoAlt,
  StarFill,
  Award,
  BriefcaseFill,
  Pencil,
  Save,
  X,
  Briefcase,
} from "react-bootstrap-icons";
import "../../styles/components/AboutTab.css";

const AboutTab = ({ profileData, isMyProfile }) => {
  const {
    bio,
    skills = [],
    languages = [],
    education = [],
    certifications = [],
    hourlyRate,
    availability,
    company,
    industry,
    permissions = [],
    workingStyle = {},
  } = profileData;

  const renderFreelancerInfo = () => {
    return (
      <>
        <Card className="mb-4">
          <Card.Body>
            <h5 className="mb-3 ">Professional Info</h5>
            <p>
              <strong>Hourly Rate:</strong> ${hourlyRate}/hr
            </p>
            <p>
              <strong>Availability:</strong> {availability}
            </p>

            <h6 className="mt-4 mb-3">Skills</h6>
            <div className="d-flex flex-wrap gap-2">
              {skills &&
                skills.map((skill, idx) => (
                  <Badge key={idx} bg="light" text="dark">
                    {typeof skill === "string" ? skill : skill.skill_name}
                  </Badge>
                ))}
            </div>

            <h6 className="mt-4 mb-3">Languages</h6>
            {languages.map((lang, index) => (
              <div key={index} className="mb-2">
                <span className="fw-medium language-title">{lang.name}</span>
                <span className="text-muted ms-2">({lang.level})</span>
              </div>
            ))}

            <h6 className="mt-4 mb-3">Certifications</h6>
            {(profileData.certifications || []).length === 0 && (
              <p>No certifications listed.</p>
            )}
            {profileData.certifications &&
              profileData.certifications.map((cert, idx) => (
                <div key={idx} className="mb-2">
                  <strong>{cert.name}</strong>
                  {cert.issuer && (
                    <>
                      {" "}
                      - <span>{cert.issuer}</span>
                    </>
                  )}
                  {cert.year && (
                    <>
                      {" "}
                      (<span>{cert.year}</span>)
                    </>
                  )}
                </div>
              ))}

            <h6 className="mt-4 mb-3">Education</h6>
            {(profileData.educations || []).length === 0 && (
              <p>No education listed.</p>
            )}
            {profileData.educations &&
              profileData.educations.map((edu, idx) => (
                <div key={idx} className="mb-2">
                  <strong>{edu.degree}</strong> - {edu.school}
                  {edu.year && (
                    <>
                      {" "}
                      (<span>{edu.year}</span>)
                    </>
                  )}
                </div>
              ))}
          </Card.Body>
        </Card>

        <Card className="mb-4">
          <Card.Body>
            <h5 className="mb-3">Professional Qualities</h5>

            <div className="soft-skills-section mb-4">
              <h6 className="section-subtitle mb-3">Soft Skills & Expertise</h6>
              {profileData.qualities?.softSkills.map((skill, index) => (
                <div key={index} className="skill-item mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-level">{skill.level}%</span>
                  </div>
                  <ProgressBar
                    now={skill.level}
                    variant="primary"
                    className="skill-progress"
                  />
                  <small className="text-muted d-block mt-1">
                    {skill.description}
                  </small>
                </div>
              ))}
            </div>

            <div className="working-preferences">
              <h6 className="section-subtitle mb-3">Working Preferences</h6>
              <Row xs={1} md={2} className="g-3">
                <Col>
                  <div className="preference-item">
                    <Clock className="icon me-2" />
                    <div>
                      <strong>Timezone</strong>
                      <p className="mb-0 text-muted">
                        {profileData.qualities?.workingPreferences.timezone}
                      </p>
                    </div>
                  </div>
                </Col>
                <Col>
                  <div className="preference-item">
                    <Calendar className="icon me-2" />
                    <div>
                      <strong>Availability</strong>
                      <p className="mb-0 text-muted">
                        {profileData.qualities?.workingPreferences.availability}
                      </p>
                    </div>
                  </div>
                </Col>
                <Col>
                  <div className="preference-item">
                    <BriefcaseFill className="icon me-2" />
                    <div>
                      <strong>Project Length</strong>
                      <p className="mb-0 text-muted">
                        {
                          profileData.qualities?.workingPreferences
                            .preferredProjectLength
                        }
                      </p>
                    </div>
                  </div>
                </Col>
                <Col>
                  <div className="preference-item">
                    <Envelope className="icon me-2" />
                    <div>
                      <strong>Communication</strong>
                      <p className="mb-0 text-muted">
                        {
                          profileData.qualities?.workingPreferences
                            .communicationStyle
                        }
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Card.Body>
        </Card>

        <Card className="mb-4">
          <Card.Body>
            <h5 className="mb-3">Education</h5>
            {education.map((edu, index) => (
              <div key={index} className="mb-3">
                <h6>{edu.degree}</h6>
                <p className="text-muted mb-1">{edu.school}</p>
                <small className="text-muted">{edu.year}</small>
              </div>
            ))}
          </Card.Body>
        </Card>

        <Card className="mb-4">
          <Card.Body>
            <h5 className="mb-3">Certifications</h5>
            {certifications.map((cert, index) => (
              <div key={index} className="mb-3">
                <h6>{cert.name}</h6>
                <p className="text-muted mb-1">{cert.issuer}</p>
                <small className="text-muted">{cert.year}</small>
              </div>
            ))}
          </Card.Body>
        </Card>
      </>
    );
  };

  const renderRoleSpecificInfo = () => {
    switch (profileData.role) {
      case "freelancer":
        return renderFreelancerInfo();

      case "client":
        return (
          <Card className="mb-4">
            <Card.Body>
              <h5 className="mb-3">Company Information</h5>
              <p>
                <strong>Company:</strong> {company}
              </p>
              <p>
                <strong>Industry:</strong> {industry}
              </p>
            </Card.Body>
          </Card>
        );

      case "admin":
        return (
          <Card className="mb-4">
            <Card.Body>
              <h5 className="mb-3">Administrative Access</h5>
              <div className="d-flex flex-wrap gap-2">
                {permissions.map((permission, index) => (
                  <Badge key={index} bg="info">
                    {permission.replace("_", " ").toUpperCase()}
                  </Badge>
                ))}
              </div>
            </Card.Body>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="about-tab">
      <Card className="mb-4">
        <Card.Body>
          <h5 className="mb-3">About Me</h5>
          <p>{bio}</p>
        </Card.Body>
      </Card>

      {renderRoleSpecificInfo()}
    </div>
  );
};

export default AboutTab;
