/** @format */

import React from "react";
import { Breadcrumb, Badge, Stack, Image } from "react-bootstrap";
import { StarFill, Clock } from "react-bootstrap-icons";

export default function ServiceHeader({ serviceData }) {
  const { title, image, rating, reviewCount, deliveryTime, freelancer } =
    serviceData;

  return (
    <div className="service-header">
      <div className="cover-image-wrapper">
        <Image src={image} className="cover-image" alt={title} />
      </div>
      <div className="header-content">
        <Breadcrumb className="breadcrumb-custom">
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/services">Services</Breadcrumb.Item>
          <Breadcrumb.Item active>{title}</Breadcrumb.Item>
        </Breadcrumb>

        <h1 className="service-title">{title}</h1>

        <div className="freelancer-card">
          <Stack direction="horizontal" gap={3} className="align-items-center">
            <Image
              src={freelancer.avatar}
              className="freelancer-avatar"
              alt={freelancer.name}
            />
            <div>
              <div className="d-flex align-items-center gap-2">
                <span className="fw-bold fs-5">{freelancer.name}</span>
                <Badge bg="success">{freelancer.level}</Badge>
              </div>
              <div className="d-flex align-items-center gap-2 text-muted mt-1">
                <StarFill className="text-warning" />
                <span>{rating}</span>
                <span>({reviewCount} reviews)</span>
                <span>·</span>
                <Clock className="ms-1" />
                <span>{deliveryTime} delivery</span>
              </div>
            </div>
          </Stack>
        </div>
      </div>
    </div>
  );
}
