/** @format */

import React from "react";
import { Card, Image, Stack, Badge } from "react-bootstrap";

export default function SellerInfo({ freelancer }) {
  const {
    name,
    avatar,
    level,
    totalProjects,
    responseTime,
    description,
    skills,
  } = freelancer;

  return (
    <Card className="border-0 shadow-sm">
      <Card.Body>
        <div className="d-flex gap-4">
          <Image
            src={avatar}
            roundedCircle
            width={72}
            height={72}
            className="seller-avatar"
          />
          <div className="flex-grow-1">
            <div className="d-flex align-items-center gap-2 mb-2">
              <h5 className="mb-0 ">{name}</h5>
              <Badge bg="primary">{level}</Badge>
            </div>
            <div className="text-muted mb-3">
              <small>
                {totalProjects} Projects · {responseTime} Response Time
              </small>
            </div>
            <p className="mb-3">{description}</p>
            <div className="d-flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <Badge
                  key={index}
                  bg="light"
                  text="dark"
                  className="skill-badge">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
