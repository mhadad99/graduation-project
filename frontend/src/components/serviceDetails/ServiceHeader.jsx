/** @format */

import React from "react";
import { Breadcrumb, Badge, Stack, Image } from "react-bootstrap";
import { StarFill, Clock, CheckCircleFill } from "react-bootstrap-icons";

const serviceTitle = "Professional Logo Design for Your Brand";
const coverImg =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80";

export default function ServiceHeader() {
  return (
    <div className="service-header">
      <div className="cover-image-wrapper">
        <Image src={coverImg} className="cover-image" alt="Service Cover" />
      </div>
      <div className="header-content">
        <Breadcrumb className="breadcrumb-custom">
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/services">Services</Breadcrumb.Item>
          <Breadcrumb.Item active>Logo Design</Breadcrumb.Item>
        </Breadcrumb>

        <h1 className="service-title">{serviceTitle}</h1>

        <div className="freelancer-card">
          <Stack direction="horizontal" gap={3} className="align-items-center">
            <Image
              src="https://randomuser.me/api/portraits/women/68.jpg"
              className="freelancer-avatar"
              alt="Freelancer Avatar"
            />
            <div>
              <div className="d-flex align-items-center gap-2">
                <span className="fw-bold fs-5">Alexandra King</span>
                <Badge bg="success">Top Rated</Badge>
              </div>
              <div className="d-flex align-items-center gap-2 text-muted mt-1">
                <StarFill className="text-warning" />
                <span>4.9</span>
                <span>(128 reviews)</span>
                <span>·</span>
                <Clock className="ms-1" />
                <span>2-3 days delivery</span>
              </div>
            </div>
          </Stack>
        </div>
      </div>
    </div>
  );
}
